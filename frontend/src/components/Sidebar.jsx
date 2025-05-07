const Sidebar = ({ isCollapsed, theme, toggleTheme }) => {

    const themeIcon = theme ? <i className="bi bi-sun me-2"></i> : <i className="bi bi-sun-fill me-2"></i>

    return (
        <div className="d-flex">
            <aside className={`sidebar ${isCollapsed} ${theme}`}>
                <div className="sidebar-logo">
                    <h3>AI CHAT</h3>
                </div>
                <div className="sidebar-menu">
                    <a href="https://github.com/kcw00/aichatapp" className="sidebar-link">About</a>
                    <a onClick={toggleTheme} className="sidebar-link">
                        {themeIcon}
                        <label>{theme ? 'Light Mode' : 'Dark Mode'}</label>
                    </a>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar


