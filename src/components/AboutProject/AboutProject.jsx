
function AboutProject() {
  return (
    <div className="aboutProject">
      <h2 className="main__heading">О проекте</h2>
      <div className="aboutProject__wrapper-caption">
        <article className="aboutProject__article">
          <h3 className="aboutProject__article-heading">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__article-caption">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="aboutProject__article">
          <h3 className="aboutProject__article-heading">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__article-caption">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fraction progress-bar__fraction_backend">
          <p className="progress-bar__fraction-fill progress-bar__fraction-fill_backend">1 неделя</p>
          <p className="progress-bar__backend-caption">Back-end</p>
        </div>
        <div className="progress-bar__fraction">
          <p className="progress-bar__fraction-fill">4 недели</p>
          <p className="progress-bar__backend-caption">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
