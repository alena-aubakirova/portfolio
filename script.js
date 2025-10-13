// Рендеринг кейсов
function renderCases() {
    const container = document.getElementById('cases-container');

    casesData.forEach(caseData => {
        const caseElement = document.createElement('div');
        caseElement.className = 'case';
        caseElement.innerHTML = `
            <div class="case-header">
                <h3 class="case-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${caseData.title}
                </h3>
                <p class="case-subtitle">${caseData.subtitle}</p>
            </div>
            
            <div class="case-preview">
                <ul class="case-preview-list">
                    ${caseData.preview.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button class="case-toggle">Подробнее</button>
            </div>
            
            <div class="case-full">
                ${caseData.sections.map(section => `
                    <div class="case-section">
                        <h4 class="case-section-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" stroke-width="3">
                                <path d="${section.icon}"/>
                            </svg>
                            ${section.title}
                        </h4>
                        ${Array.isArray(section.items) ? `
                            <ul class="case-list">
                                ${section.items.map(item => `
                                    <li style="list-style: none; position: relative; padding-left: 35px;">
                                        <span style="position: absolute; left: 15px; top: 0; width: 8px; height: 8px; background: #2E8B57; border-radius: 50%; margin-top: 8px;"></span>
                                        ${item}
                                    </li>
                                `).join('')}
                            </ul>
                        ` : `<div style="padding-left: 35px; color: #555; font-style: italic;">${section.items}</div>`}
                    </div>
                `).join('')}
                <button class="case-toggle">Свернуть</button>
            </div>
        `;

        container.appendChild(caseElement);
    });
}

// Обработчики для сворачивания/разворачивания
document.addEventListener('DOMContentLoaded', function () {
    renderCases();

    // Делегирование событий для кнопок переключения
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('case-toggle')) {
            const caseElement = e.target.closest('.case');
            caseElement.classList.toggle('case-expanded');

            // Обновляем текст кнопки
            const buttons = caseElement.querySelectorAll('.case-toggle');
            buttons.forEach(btn => {
                btn.textContent = caseElement.classList.contains('case-expanded') ? 'Свернуть' : 'Подробнее';
            });
        }

        // Обработка клика по заголовку для разворачивания
        if (e.target.closest('.case-header')) {
            const caseElement = e.target.closest('.case');
            const toggleBtn = caseElement.querySelector('.case-toggle');
            if (toggleBtn) {
                toggleBtn.click();
            }
        }
    });
});
// Добавь этот код для плавного появления элементов
document.addEventListener('DOMContentLoaded', function () {
    // Анимация появления метрик
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(20px)';
            metric.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });

    // Анимация для статистики в итогах
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за статистикой и блоком ценности
    const statItems = document.querySelectorAll('.stat-item');
    const valueProposition = document.querySelector('.value-proposition');

    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    if (valueProposition) {
        valueProposition.style.opacity = '0';
        valueProposition.style.transform = 'translateY(20px)';
        valueProposition.style.transition = 'all 0.6s ease';
        observer.observe(valueProposition);
    }
});