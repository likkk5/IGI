document.addEventListener("DOMContentLoaded", function() {
    // Получение и парсинг JSON-данных из <script> элементов
    const xValues = JSON.parse(document.getElementById('xValues').textContent);
    const seriesValues = JSON.parse(document.getElementById('seriesValues').textContent);
    const mathValues = JSON.parse(document.getElementById('mathValues').textContent);

    console.log("xValues:", xValues);
    console.log("seriesValues:", seriesValues);
    console.log("mathValues:", mathValues);

    // Проверка canvas элемента
    const ctx = document.getElementById('arcsinChart').getContext('2d');
    console.log("Canvas element:", ctx);

    if (ctx) {
        // Настройка графика Chart.js с пустыми данными для поэтапного добавления
        const arcsinChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Series Expansion (10 terms)',
                        data: [],
                        borderColor: 'blue',
                        fill: false,
                        pointRadius: 0,
                        borderWidth: 1,
                        tension: 0.1  // сглаживаем линии
                    },
                    {
                        label: 'math.asin(x)',
                        data: [],
                        borderColor: 'red',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0,
                        borderWidth: 2,
                        tension: 0.1  // сглаживаем линии
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'x'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'y = F(x)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    },
                    annotation: {
                        annotations: [
                            {
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x',
                                value: 0,
                                borderColor: 'grey',
                                borderWidth: 2,
                                label: {
                                    content: 'x = 0',
                                    enabled: true,
                                    position: 'top'
                                }
                            },
                            {
                                type: 'line',
                                mode: 'horizontal',
                                scaleID: 'y',
                                value: 0,
                                borderColor: 'grey',
                                borderWidth: 2,
                                label: {
                                    content: 'y = 0',
                                    enabled: true,
                                    position: 'top'
                                }
                            },
                            {
                                type: 'box',
                                xMin: -0.2,
                                xMax: 0.2,
                                yMin: -0.5,
                                yMax: 0.5,
                                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                borderColor: 'green',
                                borderWidth: 1,
                                label: {
                                    content: 'Highlighted Region',
                                    enabled: true,
                                    position: 'center'
                                }
                            }
                            // {
                            //     type: 'label',
                            //     x: 0,  
                            //     y: 0,  
                            //     content: 'Center of Graph',
                            //     font: {
                            //         size: 11,
                            //         family: 'Arial'
                            //     },
                            //     color: 'black',
                                
                            // }
                        ]
                    }
                },
                animation: {
                    duration: 0 
                    // duration: 5000,
                    // easing: 'easeOutBounce', 
                    // onProgress: function (animation) {
                    //     console.log('Анимация прогресса', animation.currentStep / animation.numSteps);
                    // },
                    // onComplete: function () {
                    //     console.log('Анимация завершена!');
                }
            }
        });

        // Добавление точек по одной с интервалом
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < xValues.length) {
                arcsinChart.data.labels.push(xValues[index]);
                arcsinChart.data.datasets[0].data.push(seriesValues[index]);
                arcsinChart.data.datasets[1].data.push(mathValues[index]);
                arcsinChart.update();
                index++;
            } else {
                clearInterval(intervalId); // Остановка интервала после добавления всех точек
                console.log('Анимация завершена!');
            }
        }, 100); // Задержка между добавлением точек (в миллисекундах)

        // Сохранение графика как PNG
        document.getElementById('saveBtn').addEventListener('click', function() {
            const imgUrl = arcsinChart.toBase64Image();
            const a = document.createElement('a');
            a.href = imgUrl;
            a.download = 'arcsin_plot.png';
            a.click();
        });
    } else {
        console.error("Canvas element not found!");
    }
});
