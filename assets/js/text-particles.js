/**
 * 文字粒子躲避效果 - 非侵入式
 * - 保留原始页面样式（渐变、阴影等）
 * - 只在鼠标附近推开文字
 * - Canvas 只覆盖受影响的区域
 */

class TextParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 配置
        this.config = {
            mouseRadius: 100,
            repelStrength: 2.5,
            returnSpeed: 0.1,
            friction: 0.92,
            emoji: '😂',
            emojiSize: 36,
            effectRadius: 150,
        };
        
        this.particles = [];
        this.mouse = { x: -1000, y: -1000, isDown: false };
        this.mouseTrails = [];
        this.animationId = null;
        this.lastExtractTime = 0;
        
        this.init();
    }
    
    init() {
        // Canvas 覆盖全页面
        Object.assign(this.canvas.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '9999',
            pointerEvents: 'none',
        });
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.bindEvents();
        this.animate();
        
        // 定期更新文字（滚动、resize 后布局可能变化)
        setInterval(() => this.extractText(), 2000);
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        // 防抖提取
        if (this.particles.length > 0) {
            this.extractText();
        }
    }
    
    extractText() {
        // 避免频繁提取
        const now = Date.now();
        if (now - this.lastExtractTime < 100) return;
        this.lastExtractTime = now;
        
        this.particles = [];
        
        const elements = document.querySelectorAll(
            'h1, h2, h3, h4, p, .intro-item, .badge, .honor-item, .exp-title, .exp-company, .pub-title, .pub-authors, .section-header p, .contact-content p'
        );
        
        const viewTop = window.scrollY - 300;
        const viewBottom = window.scrollY + this.height + 300;
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < -200 || rect.top > this.height + 200) return;
            if (rect.width < 1 || rect.height < 1) return;
            
            this.extractElement(el, viewTop, viewBottom);
        });
    }
    
    extractElement(element, viewTop, viewBottom) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let node;
        
        while (node = walker.nextNode()) {
            const text = node.textContent;
            if (!text.trim()) continue;
            
            const parent = node.parentElement;
            if (!parent) continue;
            if (parent.closest('nav, .chat-widget, script, style')) continue;
            
            const style = window.getComputedStyle(parent);
            const fontSize = parseFloat(style.fontSize) || 14;
            const fontFamily = style.fontFamily;
            const fontWeight = style.fontWeight;
            const color = style.color;
            
            const range = document.createRange();
            range.selectNodeContents(node);
            
            try {
                const rects = range.getClientRects();
                
                for (const rect of rects) {
                    if (rect.width < 1 || rect.height < 1) continue;
                    if (rect.bottom < -100 || rect.top > this.height + 100) continue;
                    
                    this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
                    
                    let currentX = rect.left;
                    
                    for (const char of [...text]) {
                        if (char === ' ' || char === '\n') {
                            currentX += fontSize * 0.3;
                            continue;
                        }
                        
                        const charWidth = this.ctx.measureText(char).width;
                        
                        this.particles.push({
                            char,
                            originX: currentX + charWidth / 2,
                            originY: rect.top + fontSize * 0.75,
                            x: currentX + charWidth / 2,
                            y: rect.top + fontSize * 0.75,
                            vx: 0,
                            vy: 0,
                            fontSize,
                            fontFamily,
                            fontWeight,
                            color,
                            affected: false,
                        });
                        
                        currentX += charWidth + 0.5;
                    }
                }
            } catch (e) {}
        }
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            if (this.mouse.isDown) {
                this.mouseTrails.push({ x: this.mouse.x, y: this.mouse.y, age: 0 });
                if (this.mouseTrails.length > 50) this.mouseTrails.shift();
            }
        });
        
        document.addEventListener('mousedown', () => {
            this.mouse.isDown = true;
            this.mouseTrails = [{ x: this.mouse.x, y: this.mouse.y, age: 0 }];
        });
        
        document.addEventListener('mouseup', () => {
            this.mouse.isDown = false;
        });
        
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.resize(), 150);
        });
    }
    
    update() {
        const radius = this.config.mouseRadius;
        const strength = this.config.repelStrength;
        const effectR = this.config.effectRadius;
        
        // 老化轨迹
        this.mouseTrails = this.mouseTrails.filter(t => t.age++ < 60);
        
        // 收集影响点
        const influencePoints = [
            { x: this.mouse.x, y: this.mouse.y, strength: 1 },
            ...this.mouseTrails.map(t => ({ 
                x: t.x, y: t.y, 
                strength: (1 - t.age / 60) * 0.5,
            }))
        ];
        
        const viewTop = window.scrollY - 200;
        const viewBottom = this.height + 200;
        
        for (const p of this.particles) {
            if (p.originY < viewTop || p.originY > viewBottom) continue;
            
            const dx0 = p.originX - this.mouse.x;
            const dy0 = p.originY - this.mouse.y;
            const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
            
            // 只处理影响范围内的粒子
            if (dist0 < effectR) {
                let fx = 0, fy = 0;
                
                for (const point of influencePoints) {
                    const pdx = p.x - point.x;
                    const pdy = p.y - point.y;
                    const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
                    
                    if (pdist < radius && pdist > 0) {
                        const force = (radius - pdist) / radius * strength * point.strength;
                        fx += (pdx / pdist) * force;
                        fy += (pdy / pdist) * force;
                    }
                }
                
                p.vx += fx;
                p.vy += fy;
                p.affected = true;
            }
            
            if (p.affected) {
                p.vx += (p.originX - p.x) * this.config.returnSpeed;
                p.vy += (p.originY - p.y) * this.config.returnSpeed;
                p.vx *= this.config.friction;
                p.vy *= this.config.friction;
                p.x += p.vx;
                p.y += p.vy;
                
                // 如果回到原位，标记为未受影响
                if (Math.abs(p.x - p.originX) < 0.5 && Math.abs(p.y - p.originY) < 0.5) {
                    p.affected = false;
                }
            }
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const viewTop = window.scrollY - 100;
        const viewBottom = window.scrollY + this.height + 100;
        const effectR = this.config.effectRadius;
        
        for (const p of this.particles) {
            if (p.y < viewTop || p.y > viewBottom) continue;
            if (!p.affected) continue;
            
            const dispX = p.x - p.originX;
            const dispY = p.y - p.originY;
            const disp = Math.sqrt(dispX * dispX + dispY * dispY);
            if (disp < 0.5) continue;
            
            // 背景色覆盖原文字
            const padding = 3;
            this.ctx.fillStyle = '#050508';
            this.ctx.beginPath();
            this.ctx.arc(p.originX, p.originY, p.fontSize * 0.7 + padding, 0, Math.PI * 2);
            this.ctx.fill();
            
            // 新位置绘制
            this.ctx.font = `${p.fontWeight} ${p.fontSize}px ${p.fontFamily}`;
            this.ctx.fillStyle = p.color;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(p.char, p.x, p.y);
        }
        
        // 鼠标 emoji
        if (this.mouse.x > 0 && this.mouse.y > 0) {
            const t = Date.now() / 200;
            
            this.ctx.save();
            this.ctx.translate(this.mouse.x, this.mouse.y);
            this.ctx.rotate(Math.sin(t) * 0.15);
            this.ctx.scale(1 + Math.sin(t * 2) * 0.05, 1 + Math.sin(t * 2) * 0.05);
            this.ctx.font = `${this.config.emojiSize}px serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.config.emoji, 0, 0);
            this.ctx.restore();
            
            // 轨迹
            for (const trail of this.mouseTrails) {
                const alpha = 1 - trail.age / 60;
                this.ctx.globalAlpha = alpha * 0.35;
                this.ctx.font = `${this.config.emojiSize * 0.5 * alpha}px serif`;
                this.ctx.fillText(this.config.emoji, trail.x, trail.y);
            }
            this.ctx.globalAlpha = 1;
        }
    }
    
    animate() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        cancelAnimationFrame(this.animationId);
        this.canvas.remove();
    }
}

let particleInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        particleInstance = new TextParticles();
    }, 500);
});
