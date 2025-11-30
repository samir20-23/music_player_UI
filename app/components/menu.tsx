import { useState } from 'react'; // 1. Import useState
import './menu.css';

export default function Menu() {
    // 2. State to manage menu visibility
    const [isVisible, setIsVisible] = useState(true);

    // 3. Function to handle the close action
    const handleClose = () => {
        setIsVisible(false);
    };

    // 4. Conditionally render the menu
    if (!isVisible) {
        return
    }

    return (
        <div className="context-menu-container">
            {/* 5. Add the Close Button */}
            <button className="close-button" onClick={handleClose}>
                &times; {/* This is the 'multiplication sign' character, often used as 'X' */}
            </button>

            <ul className="context-menu">
                <li role="presentation" className="menu-item">
                    <button role="menuitem" tabIndex={0} className="menu-button">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M11 7.5H8.75V5a.75.75 0 0 0-1.5 0v2.5H5a.75.75 0 0 0 0 1.5h2.25V11a.75.75 0 0 0 1.5 0V9H11a.75.75 0 0 0 0-1.5zM8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8z"></path></svg>
                        <span className="menu-text">Add to Your Library</span>
                    </button>
                </li>
                <li role="presentation" className="menu-item">
                    <button role="menuitem" tabIndex={-1} className="menu-button">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M16 15H2v-1.5h14zm0-4.5H2V9h14zm-8.034-6A5.5 5.5 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2z"></path></svg>
                        <span className="menu-text">Add to queue</span>
                    </button>
                </li>
                <li role="presentation" className="menu-item">
                    <button role="menuitem" tabIndex={-1} className="menu-button">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M5.624 3.886A4.75 4.75 0 0 0 3.25 8c0 1.758.955 3.293 2.375 4.114l.75-1.3a3.249 3.249 0 0 1 0-5.63l-.75-1.298zm4.001 1.299.75-1.3A4.75 4.75 0 0 1 12.75 8a4.75 4.75 0 0 1-2.375 4.114l-.75-1.3a3.249 3.249 0 0 0 0-5.63zM8 6.545a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91M4 1.07A8 8 0 0 0 0 8a8 8 0 0 0 4 6.93l.75-1.3A6.5 6.5 0 0 1 1.5 8a6.5 6.5 0 0 1 3.25-5.63zm7.25 1.3.75-1.3A8 8 0 0 1 16 8a8 8 0 0 1-3.999 6.93l-.75-1.3A6.5 6.5 0 0 0 14.5 8a6.5 6.5 0 0 0-3.25-5.63"></path></svg>
                        <span className="menu-text">Go to artist radio</span>
                    </button>
                </li>

                <div className="menu-divider"></div>

                <li role="presentation" className="menu-item menu-flyout">
                    <button role="menuitem" aria-expanded="false" tabIndex={-1} className="menu-button">
                        <div className="menu-content">
                            <svg viewBox="0 0 16 16" width="16" height="16"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path></svg>
                            <span className="menu-text">Add to playlist</span>
                        </div>
                        <span className="flyout-arrow">
                            <svg viewBox="0 0 16 16" width="16" height="16"><path d="M14 10 8 4l-6 6z"></path></svg>
                        </span>
                    </button>
                </li>
                <li role="presentation" className="menu-item menu-flyout">
                    <button role="menuitem" aria-expanded="false" tabIndex={-1} className="menu-button">
                        <div className="menu-content">
                            <svg viewBox="0 0 16 16" width="16" height="16"><path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75z"></path><path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75"></path></svg>
                            <span className="menu-text">Share</span>
                        </div>
                        <span className="flyout-arrow">
                            <svg viewBox="0 0 16 16" width="16" height="16"><path d="M14 10 8 4l-6 6z"></path></svg>
                        </span>
                    </button>
                </li>

                <div className="menu-divider"></div>

                <li role="presentation" className="menu-item">
                    <button role="menuitem" tabIndex={-1} className="menu-button">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M8.319.006A8.003 8.003 0 0 0 .006 7.683a8 8 0 0 0 7.677 8.31A8 8 0 0 0 8.319.006m3.377 11.72a.48.48 0 0 1-.652.179 9.6 9.6 0 0 0-3.426-1.165 9.6 9.6 0 0 0-3.613.176.479.479 0 0 1-.226-.93c1.3-.316 2.637-.38 3.972-.193 1.336.188 2.602.62 3.765 1.28.228.13.309.422.178.652zm1.05-2.1a.62.62 0 0 1-.841.25A11.8 11.8 0 0 0 7.923 8.57a11.8 11.8 0 0 0-4.188.158.62.62 0 0 1-.74-.473.62.62 0 0 1 .473-.739 13 13 0 0 1 4.626-.176c1.552.217 3.031.704 4.4 1.444a.62.62 0 0 1 .25.842h.003Zm1.166-2.367a.765.765 0 0 1-1.031.326 14.3 14.3 0 0 0-4.612-1.473 14.3 14.3 0 0 0-4.84.145.764.764 0 1 1-.303-1.499 15.8 15.8 0 0 1 5.356-.16c1.791.252 3.51.8 5.104 1.63.374.194.52.656.326 1.03Z"></path></svg>
                        <span className="menu-text">Open in Desktop app</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}