import React from 'react';
import styles from './Sidebar.module.css';
import sections from '../sections'


function Sidebar({ onSelectSection, active }) {

  const handleNavigation = (id) => {
    onSelectSection(id);
  };

  return (
    <div className={`${styles.sidebar} ${active}`}>
      <div className={styles["sidebar-header"]}>
        <span>Visualizations</span>
      </div>
      <ul className = {styles['sidebar-links']}>
        {sections.map((section) => (
          <li button key={section.id} onClick={() => handleNavigation(section.id)}>
            {section.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
