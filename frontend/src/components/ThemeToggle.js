import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return ( < button onClick = { toggleTheme }
        style = {
            {
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: theme === 'light' ? '#333' : '#ddd',
                color: theme === 'light' ? '#fff' : '#000',
                transition: 'all 0.3s ease',
            }
        } > { theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode' } < /button>
    );
};

export default ThemeToggle;