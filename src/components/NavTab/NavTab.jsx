

const NavTab = () => {
  return (
    <div >
      <ul className="nav-tab">
        <li>
          <a className="nav-tab__btn btn-gray" href="#about-project">
            О проекте
          </a>
        </li>
        <li>
          <a className="nav-tab__btn btn-gray" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="nav-tab__btn btn-gray" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavTab;
