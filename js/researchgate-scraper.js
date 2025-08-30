// Automatic ResearchGate Data Scraper
class AutoResearchGateScraper {
    constructor() {
        this.profileUrl = 'https://www.researchgate.net/profile/Brenno-Castro';
        this.proxyServices = [
            'https://api.allorigins.win/get?url=',
            'https://cors-anywhere.herokuapp.com/',
            'https://corsproxy.io/?'
        ];
        this.currentData = {
            publications: '23',
            citations: '77',
            reads: '1243'
        };
        this.isUpdating = false;
        this.updateInterval = null;
    }

    // Teste de formatação conforme especificações das imagens
    testFormatCompliance() {
        console.log('🧪 TESTE DE CONFORMIDADE COM AS IMAGENS');
        console.log('=======================================');
        
        // Dados esperados conforme ResearchGate
        const researchGateData = {
            publications: '23', // de "23 Publications"
            citations: '77',    // de "77 Citations" 
            reads: '1243'       // de "1,243 Reads" → "1243"
        };
        
        // Dados atuais na página
        const currentPageData = {
            publications: document.querySelector('[data-rg-stat="publications"]')?.textContent || '0',
            citations: document.querySelector('[data-rg-stat="citations"]')?.textContent || '0',
            reads: document.querySelector('[data-rg-stat="reads"]')?.textContent || '0'
        };
        
        console.log('📊 ResearchGate → Sua Página:');
        console.log(`📚 Publications: "23 Publications" → "${currentPageData.publications}" (esperado: "23")`);
        console.log(`📖 Citations: "77 Citations" → "${currentPageData.citations}" (esperado: "77")`);
        console.log(`👁️ Reads: "1,243 Reads" → "${currentPageData.reads}" (esperado: "1243")`);
        
        // Verificar conformidade
        const isCompliant = 
            currentPageData.publications === researchGateData.publications &&
            currentPageData.citations === researchGateData.citations &&
            currentPageData.reads === researchGateData.reads;
            
        if (isCompliant) {
            console.log('✅ FORMATO TOTALMENTE CONFORME!');
        } else {
            console.log('❌ Formato precisa de ajuste');
            console.log('💡 Execute forceUpdate() para corrigir');
        }
        
        return isCompliant;
    }

    // Validar e normalizar formato dos dados
    validateAndFormatData(extractedData) {
        const formattedData = {};
        
        // Publications: número simples (ex: "23")
        const pubNum = parseInt(extractedData.publications || '0');
        formattedData.publications = pubNum.toString();
        
        // Citations: número simples (ex: "77") 
        const citNum = parseInt(extractedData.citations || '0');
        formattedData.citations = citNum.toString();
        
        // Reads: número sem vírgulas (ex: "1243" ao invés de "1,243")
        const readsStr = extractedData.reads || '0';
        const readsNum = parseInt(readsStr.replace(/,/g, ''));
        formattedData.reads = readsNum.toString();
        
        console.log('📋 Dados formatados conforme especificação:', formattedData);
        console.log('📊 Formato esperado na página:', {
            publications: 'XX (número simples)',
            citations: 'XX (número simples)', 
            reads: 'XXXX (número sem vírgulas)'
        });
        
        return formattedData;
    }

    // Extrair dados específicos do ResearchGate
    extractStatsFromHTML(html) {
        try {
            console.log('🔍 Extraindo dados do ResearchGate...');
            
            // Padrões mais específicos para o ResearchGate
            const patterns = {
                publications: [
                    /(\d+)\s*Publications/i,
                    /Publications\s*\((\d+)\)/i,
                    /"publications"[^>]*>(\d+)</i,
                    /class="[^"]*publications[^"]*"[^>]*>(\d+)</i
                ],
                citations: [
                    /(\d+)\s*Citations/i,
                    /Citations\s*(\d+)/i,
                    /"citations"[^>]*>(\d+)</i,
                    /class="[^"]*citations[^"]*"[^>]*>(\d+)</i
                ],
                reads: [
                    /([\d,]+)\s*Reads/i,
                    /(\d{1,3}(?:,\d{3})*)\s*Reads/i,
                    /"reads"[^>]*>([\d,]+)</i,
                    /class="[^"]*reads[^"]*"[^>]*>([\d,]+)</i,
                    /Reads\s*.*?(\d{1,3}(?:,\d{3})*)/i
                ]
            };

            const extractedData = {};

            // Tentar extrair cada estatística
            for (const [key, patternList] of Object.entries(patterns)) {
                let found = false;
                for (const pattern of patternList) {
                    const match = html.match(pattern);
                    if (match) {
                        if (key === 'reads') {
                            // Para reads: extrair 1,243 e converter para 1243 (sem vírgulas)
                            const numStr = match[1].replace(/,/g, '');
                            extractedData[key] = numStr;
                        } else {
                            // Para publications e citations: número simples sem +
                            extractedData[key] = match[1];
                        }
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    extractedData[key] = this.currentData[key];
                }
            }

            console.log('✅ Dados extraídos:', extractedData);
            
            // Validar e formatar dados conforme especificação
            const formattedData = this.validateAndFormatData(extractedData);
            
            return formattedData;
        } catch (error) {
            console.error('❌ Erro ao extrair dados:', error);
            return this.currentData;
        }
    }

    // Tentar múltiplos proxies para contornar CORS
    async fetchWithProxy(proxyIndex = 0) {
        if (proxyIndex >= this.proxyServices.length) {
            throw new Error('Todos os proxies falharam');
        }

        try {
            const proxyUrl = this.proxyServices[proxyIndex];
            const url = proxyUrl + encodeURIComponent(this.profileUrl);
            
            console.log(`🌐 Tentando proxy ${proxyIndex + 1}/${this.proxyServices.length}:`, proxyUrl);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 10000
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return data.contents || data;
        } catch (error) {
            console.warn(`❌ Proxy ${proxyIndex + 1} falhou:`, error.message);
            return this.fetchWithProxy(proxyIndex + 1);
        }
    }

    // Buscar dados do ResearchGate automaticamente
    async fetchResearchGateData() {
        if (this.isUpdating) {
            console.log('⏳ Atualização já em andamento...');
            return this.currentData;
        }

        this.isUpdating = true;
        
        try {
            console.log('🚀 Iniciando scraping automático do ResearchGate...');
            
            // Mostrar indicador visual de loading
            this.showLoadingIndicator();
            
            const htmlContent = await this.fetchWithProxy();
            const extractedStats = this.extractStatsFromHTML(htmlContent);
            
            // Verificar se os dados mudaram
            const hasChanges = this.detectChanges(extractedStats);
            
            if (hasChanges) {
                console.log('📊 Novas estatísticas detectadas:', extractedStats);
                this.currentData = extractedStats;
                await this.updatePageElements(extractedStats);
                this.showSuccessNotification('Dados atualizados automaticamente!');
            } else {
                console.log('✅ Dados já estão atualizados');
                this.showInfoNotification('Dados já estão atualizados');
            }
            
            return extractedStats;
        } catch (error) {
            console.error('❌ Erro no scraping automático:', error);
            this.showErrorNotification('Falha ao atualizar dados');
            return this.currentData;
        } finally {
            this.isUpdating = false;
            this.hideLoadingIndicator();
        }
    }

    // Detectar mudanças nos dados
    detectChanges(newData) {
        return Object.keys(newData).some(key => 
            this.currentData[key] !== newData[key]
        );
    }

    // Atualizar elementos na página com animação
    async updatePageElements(stats) {
        const elements = {
            publications: document.querySelector('[data-rg-stat="publications"]'),
            citations: document.querySelector('[data-rg-stat="citations"]'),
            reads: document.querySelector('[data-rg-stat="reads"]')
        };

        for (const [key, element] of Object.entries(elements)) {
            if (element && stats[key]) {
                await this.animateNumberChange(element, stats[key]);
                await new Promise(resolve => setTimeout(resolve, 200)); // Delay entre animações
            }
        }
    }

    // Animação avançada para mudança de números
    animateNumberChange(element, newValue) {
        return new Promise(resolve => {
            if (!element) {
                resolve();
                return;
            }

            // Fase 1: Fade out com scale down
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '0.3';
            element.style.transform = 'scale(0.8) rotateY(90deg)';
            
            setTimeout(() => {
                // Fase 2: Atualizar valor
                element.textContent = newValue;
                
                // Fase 3: Fade in com scale up e glow
                element.style.opacity = '1';
                element.style.transform = 'scale(1.1)';
                element.style.color = 'var(--accent-color)';
                element.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
                
                setTimeout(() => {
                    // Fase 4: Normalizar
                    element.style.transform = 'scale(1)';
                    element.style.color = '';
                    element.style.textShadow = '';
                    resolve();
                }, 400);
            }, 300);
        });
    }

    // Indicadores visuais
    showLoadingIndicator() {
        this.createNotification('🔄 Atualizando dados...', 'loading');
    }

    hideLoadingIndicator() {
        const loading = document.querySelector('.rg-notification.loading');
        if (loading) loading.remove();
    }

    showSuccessNotification(message) {
        this.createNotification(`✅ ${message}`, 'success');
    }

    showErrorNotification(message) {
        this.createNotification(`❌ ${message}`, 'error');
    }

    showInfoNotification(message) {
        this.createNotification(`ℹ️ ${message}`, 'info');
    }

    createNotification(message, type) {
        // Remover notificações anteriores
        document.querySelectorAll('.rg-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `rg-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 25px;
            color: white;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: slideInNotification 0.3s ease-out;
            ${type === 'success' ? 'background: rgba(34, 197, 94, 0.9);' : ''}
            ${type === 'error' ? 'background: rgba(239, 68, 68, 0.9);' : ''}
            ${type === 'info' ? 'background: rgba(59, 130, 246, 0.9);' : ''}
            ${type === 'loading' ? 'background: rgba(0, 212, 255, 0.9);' : ''}
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover após 3 segundos (exceto loading)
        if (type !== 'loading') {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutNotification 0.3s ease-in';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 3000);
        }
    }

    // Iniciar monitoramento automático
    startAutoUpdate(intervalMinutes = 30) {
        console.log(`🤖 Iniciando scraping automático a cada ${intervalMinutes} minutos`);
        
        // Primeira atualização imediata
        setTimeout(() => this.fetchResearchGateData(), 2000);
        
        // Atualizações periódicas
        this.updateInterval = setInterval(() => {
            this.fetchResearchGateData();
        }, intervalMinutes * 60 * 1000);
    }

    // Parar monitoramento
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('⏹️ Scraping automático interrompido');
        }
    }
}

// CSS para notificações
const notificationCSS = document.createElement('style');
notificationCSS.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutNotification {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationCSS);

// Inicialização automática
let scraper;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 RESEARCHGATE AUTO-SCRAPER INICIADO');
    console.log('=====================================');
    
    scraper = new AutoResearchGateScraper();
    
    // Iniciar scraping automático a cada 30 minutos
    scraper.startAutoUpdate(30);
    
    // Expor para debug
    window.rgScraper = scraper;
    window.forceUpdate = () => scraper.fetchResearchGateData();
    window.testFormat = () => scraper.testFormatCompliance();
    
    console.log('🔧 Funções disponíveis:');
    console.log('- forceUpdate()    : Força atualização imediata');
    console.log('- testFormat()     : Testa conformidade do formato');
    console.log('- rgScraper        : Acesso ao objeto scraper');
    
    // Testar conformidade inicial
    setTimeout(() => {
        scraper.testFormatCompliance();
    }, 1000);
});
