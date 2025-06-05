import React, { useState, useEffect } from 'react';
import './IndividualPerformance.css';

const CircleProgress = ({ percentage, className, title }) => {
    return (
        <div className="single-chart">
            <svg viewBox="0 0 36 36" className={`circular-chart ${className}`}>
                <path
                    className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="circle"
                    strokeDasharray={`${percentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{percentage}%</text>
            </svg>
            <div className="chart-title">{title}</div>
        </div>
    );
};

const IndividualPerformance = () => {
    const [efficiency, setEfficiency] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [average, setAverage] = useState(0);
    const [growth, setGrowth] = useState(0);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        if (!animated) {
            animateCounters();
            setAnimated(true);
        }

        const handleScroll = () => {
            const element = document.querySelector('.performance-container');
            if (element) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                if (isVisible && !animated) {
                    animateCounters();
                    setAnimated(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animated]);

    const animateCounters = () => {
        animateValue(setEfficiency, 0, 78, 1500);
        animateValue(setAccuracy, 0, 85, 1500);
        animateValue(setAverage, 0, 72, 1500);
        animateValue(setGrowth, 0, 64, 1500);
    };

    const animateValue = (setter, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setter(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    return (
        <div className="performance-container">
            <div className="performance-header">
                <h2>Individual Performance</h2>
            </div>

            <div className="performance-metrics">
                <CircleProgress
                    percentage={efficiency}
                    className="orange"
                    title="Efficiency"
                />
                <CircleProgress
                    percentage={accuracy}
                    className="green"
                    title="Accuracy"
                />
                <CircleProgress
                    percentage={average}
                    className="purple"
                    title="Average"
                />
            </div>
           
        </div>
    );
};

export default IndividualPerformance;