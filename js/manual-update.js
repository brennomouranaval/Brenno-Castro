/**
 * Manual ResearchGate Data Update Script
 * 
 * Este arquivo contém funções para atualizar manualmente os dados do ResearchGate
 * Você pode executar essas funções no console do navegador ou criar botões para acioná-las
 */

// Dados mais recentes obtidos do ResearchGate (atualize quando necessário)
const LATEST_RESEARCHGATE_DATA = {
    publications: '23+',
    citations: '77+',
    reads: '1,243+',
    lastUpdated: '2025-08-29' // Data da última atualização
};

/**
 * Valida os dados atuais na página contra os dados do ResearchGate
 */
function validateCurrentData() {
    const currentStats = {
        publications: document.querySelector('[data-rg-stat="publications"]')?.textContent || '0',
        citations: document.querySelector('[data-rg-stat="citations"]')?.textContent || '0',
        reads: document.querySelector('[data-rg-stat="reads"]')?.textContent || '0'
    };

    const expectedStats = {
        publications: '23+',
        citations: '77+',
        reads: '1,243+'
    };

    console.log('📊 VALIDAÇÃO DOS DADOS');
    console.log('===================');
    console.log('Dados atuais na página:', currentStats);
    console.log('Dados esperados (ResearchGate):', expectedStats);
    
    const issues = [];
    Object.keys(expectedStats).forEach(key => {
        if (currentStats[key] !== expectedStats[key]) {
            issues.push(`${key}: ${currentStats[key]} → deveria ser ${expectedStats[key]}`);
        }
    });
    
    if (issues.length > 0) {
        console.log('❌ Problemas encontrados:');
        issues.forEach(issue => console.log(`   - ${issue}`));
        console.log('💡 Execute updateStatsManually() para corrigir');
        return false;
    } else {
        console.log('✅ Todos os dados estão corretos!');
        return true;
    }
}

/**
 * Atualiza as estatísticas manualmente com os dados mais recentes
 */
function updateStatsManually() {
    console.log('🔄 Atualizando estatísticas do ResearchGate...');
    
    const stats = [
        { selector: '[data-rg-stat="publications"]', value: LATEST_RESEARCHGATE_DATA.publications },
        { selector: '[data-rg-stat="citations"]', value: LATEST_RESEARCHGATE_DATA.citations },
        { selector: '[data-rg-stat="reads"]', value: LATEST_RESEARCHGATE_DATA.reads }
    ];

    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element && element.textContent !== stat.value) {
            // Animação de atualização
            element.classList.add('stat-updating');
            
            setTimeout(() => {
                element.textContent = stat.value;
                element.classList.remove('stat-updating');
                element.classList.add('stat-updated');
                
                setTimeout(() => {
                    element.classList.remove('stat-updated');
                }, 800);
            }, 300);
        }
    });

    console.log('✅ Estatísticas atualizadas:', LATEST_RESEARCHGATE_DATA);
}

/**
 * Simula uma busca no ResearchGate e atualiza os dados
 * (Para uso futuro com API real ou proxy)
 */
async function simulateResearchGateFetch() {
    console.log('🌐 Simulando busca no ResearchGate...');
    
    // Simular delay de rede
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(LATEST_RESEARCHGATE_DATA);
        }, 1000);
    });
}

/**
 * Verifica se há diferenças entre os dados atuais e os novos
 */
function checkForUpdates() {
    const currentStats = {
        publications: document.querySelector('[data-rg-stat="publications"]')?.textContent || '0',
        citations: document.querySelector('[data-rg-stat="citations"]')?.textContent || '0',
        reads: document.querySelector('[data-rg-stat="reads"]')?.textContent || '0'
    };

    const hasUpdates = Object.keys(LATEST_RESEARCHGATE_DATA).some(key => {
        if (key === 'lastUpdated') return false;
        return currentStats[key] !== LATEST_RESEARCHGATE_DATA[key];
    });

    if (hasUpdates) {
        console.log('📊 Atualizações disponíveis:', {
            current: currentStats,
            latest: LATEST_RESEARCHGATE_DATA
        });
        return true;
    } else {
        console.log('✅ Estatísticas já estão atualizadas');
        return false;
    }
}

/**
 * Cria um botão de atualização manual (para debug/admin)
 */
function createUpdateButton() {
    const button = document.createElement('button');
    button.textContent = '🔄 Atualizar Stats';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        padding: 10px 15px;
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', updateStatsManually);
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
    });
    
    document.body.appendChild(button);
    
    // Auto-hide após 10 segundos
    setTimeout(() => {
        button.style.opacity = '0.3';
        button.style.pointerEvents = 'none';
    }, 10000);
}

// Instruções de uso no console
console.log(`
🎯 RESEARCHGATE DATA UPDATER
============================

Funções disponíveis:
- validateCurrentData()     : Valida se os dados estão corretos
- updateStatsManually()     : Atualiza as estatísticas manualmente
- checkForUpdates()         : Verifica se há atualizações disponíveis  
- createUpdateButton()      : Cria botão de atualização na página
- simulateResearchGateFetch(): Simula busca no ResearchGate

Exemplo de uso:
> validateCurrentData()
> updateStatsManually()
> checkForUpdates()

Dados corretos: ${JSON.stringify(LATEST_RESEARCHGATE_DATA, null, 2)}
`);

// Expor funções globalmente para uso no console
window.validateCurrentData = validateCurrentData;
window.updateStatsManually = updateStatsManually;
window.checkForUpdates = checkForUpdates;
window.createUpdateButton = createUpdateButton;
window.simulateResearchGateFetch = simulateResearchGateFetch;
