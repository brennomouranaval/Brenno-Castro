# ResearchGate Web Scraping System

Este sistema permite atualizar automaticamente as estatísticas do seu perfil do ResearchGate na página pessoal.

## 📊 Dados Atuais (29/08/2025)

Extraídos do perfil: https://www.researchgate.net/profile/Brenno-Castro

- **Publicações:** 23+
- **Citações:** 77+  
- **Leituras:** 1.2K+

## 🔧 Como Funciona

### 1. Atualização Automática
- O sistema tenta buscar dados do ResearchGate automaticamente a cada 2 horas
- Usa proxy CORS para contornar limitações de CORS
- Fallback para dados hardcoded em caso de falha

### 2. Atualização Manual
- Abra o console do navegador (F12)
- Execute: `updateStatsManually()`
- Ou execute: `checkForUpdates()` para verificar se há atualizações

### 3. Botão de Debug
- Execute `createUpdateButton()` no console para criar um botão de atualização na página

## 📝 Como Atualizar os Dados

### Método 1: Automático via Console
```javascript
// No console do navegador
updateStatsManually()
```

### Método 2: Editando o código
1. Abra o arquivo `js/manual-update.js`
2. Atualize o objeto `LATEST_RESEARCHGATE_DATA`:
```javascript
const LATEST_RESEARCHGATE_DATA = {
    publications: 'XX+',  // Novo número de publicações
    citations: 'XX+',     // Novo número de citações  
    reads: 'X.XK+',       // Novo número de leituras
    lastUpdated: '2025-XX-XX'
};
```

### Método 3: Web Scraping Real
Para implementar web scraping real do ResearchGate:

1. **Backend com Puppeteer (Node.js):**
```javascript
const puppeteer = require('puppeteer');

async function scrapeResearchGate() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.researchgate.net/profile/Brenno-Castro');
    
    const stats = await page.evaluate(() => {
        // Extrair dados da página
        const pubText = document.querySelector('[data-testid="publications-count"]')?.textContent;
        const citText = document.querySelector('[data-testid="citations-count"]')?.textContent;
        const readText = document.querySelector('[data-testid="reads-count"]')?.textContent;
        
        return { publications: pubText, citations: citText, reads: readText };
    });
    
    await browser.close();
    return stats;
}
```

2. **Python com BeautifulSoup:**
```python
import requests
from bs4 import BeautifulSoup

def scrape_researchgate():
    url = 'https://www.researchgate.net/profile/Brenno-Castro'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extrair estatísticas
    stats = {}
    # Implementar extração baseada na estrutura HTML do ResearchGate
    
    return stats
```

## 🎨 Recursos Visuais

### Animações
- Pulse effect quando os números são atualizados
- Glow effect ao passar o mouse sobre as estatísticas
- Transições suaves para mudanças de valores

### Indicadores
- Indicador visual quando há atualizações disponíveis
- Animações de loading durante a atualização
- Feedback visual de sucesso/erro

## 🔄 Frequência de Atualização

- **Automática:** A cada 2 horas
- **Manual:** Quando necessário via console
- **On-demand:** Botão de debug para testes

## 📱 Responsividade

O sistema funciona em:
- Desktop (Chrome, Firefox, Safari, Edge)
- Mobile (iOS Safari, Chrome Mobile)
- Tablets

## 🐛 Troubleshooting

### Problema: Dados não atualizam
**Solução:** Execute `checkForUpdates()` no console para verificar se há atualizações pendentes

### Problema: CORS errors
**Solução:** O sistema usa fallback para dados hardcoded em caso de erro de CORS

### Problema: Animações não funcionam
**Solução:** Verifique se o CSS foi carregado corretamente e se o navegador suporta CSS animations

## 🔮 Implementações Futuras

1. **API Backend:** Criar endpoint próprio para buscar dados do ResearchGate
2. **Cache Inteligente:** Implementar sistema de cache para reduzir requisições
3. **Notificações:** Alertas quando há novas publicações ou citações
4. **Dashboard:** Painel administrativo para gerenciar atualizações
5. **Histórico:** Gráficos mostrando evolução das estatísticas ao longo do tempo

## 📊 Estrutura dos Arquivos

```
js/
├── researchgate-scraper.js    # Sistema principal de scraping
├── manual-update.js           # Funções de atualização manual
└── script.js                  # Scripts principais da página

css/
└── style.css                  # Estilos incluindo animações das stats
```

## 💡 Dicas de Uso

1. **Para desenvolvedores:** Use o console para testar atualizações
2. **Para atualizações rápidas:** Edite diretamente o `LATEST_RESEARCHGATE_DATA`
3. **Para monitoramento:** Configure notificações quando os números mudam significativamente

---

*Sistema criado para automatizar a atualização das estatísticas do ResearchGate na página pessoal do Dr. Brenno Castro*
