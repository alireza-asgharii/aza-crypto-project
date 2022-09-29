import React from "react";

//Styles
import styles from "../styles/aboutus.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>About Me</h3>
      <div className={styles.item}>
        <h6 className={styles.itemTitle}>
          Specifications of the project designer and developer:
        </h6>
        <h6>Alireza Asghari</h6>
      </div>
      <div className={styles.item}>
        <h6 className={styles.github}>github: <a href="https://github.com/alirezwa03">my github</a> </h6>
      </div>
      <div className={styles.item}>
        <h6>Skills:</h6>
        <div className={styles.skillsItem}>
          <span>HTML & CSS</span>
          <span>Java Script (ES 6)</span>
          <span>bootstrap 5</span>
          <span>SASS</span>
          <span>Git & github</span>
          <span>Reactjs</span>
          <span>react router dom (SPA site)</span>
          <span>Redux</span>
          <span>responsive design</span>
        </div>
      </div>

      <div className={styles.item}>
        <h6>Technologies used in this project:</h6>
        <div className={styles.skillsItem}>
          <span>HTML & CSS</span>
          <span>Java Script (ES 6)</span>
          <span>bootstrap 5</span>
          <span>SASS</span>
          <span>Git & github</span>
          <span>Reactjs</span>
          <span>react router dom (SPA site)</span>
          <span>Redux</span>
          <span>Chrtjs</span>
          <span>Styled Components</span>
          <span>responsive design</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
