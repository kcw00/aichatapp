const Sidebar = ({ isCollapsed, theme }) =>{

    return (
        <div className="d-flex">
            <aside className={`sidebar ${isCollapsed} ${theme}`}>
                <div className="sidebar-logo">
                    <h3>AI CHAT</h3>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">Previous Chats</li>
                    <li>
                        <a href="#" className="sidebar-link">Chat 1</a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">Chat 2</a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">Chat 3</a>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar


