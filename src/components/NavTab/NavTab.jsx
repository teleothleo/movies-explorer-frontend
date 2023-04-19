

const NavTab = () => {
  return (
    <div className="nav-tab">
      <a href="#about-project">
        <button className="nav-tab__btn btn-gray">О проекте</button>
      </a>
      <a href="#techs">
        <button className="nav-tab__btn btn-gray">Технологии</button>
      </a>
      <a href="#about-me">
        <button className="nav-tab__btn btn-gray">Студент</button>
      </a>
    </div>
  );
}

export default NavTab;
