import playerImage from "./user.jpg";

export function Player({ stats, activeItems }) {
  const agStats = DataAgregation(activeItems);

  function DataAgregation(activeItems) {
    return activeItems.reduce(
      (acc, item) => {
        acc.atak += item.atak;
        acc.obrona += item.obrona;
        acc.magia += item.magia;
        return acc;
      },
      { atak: 0, obrona: 0, magia: 0 }
    );
  }

  function showStats(stats, agStats) {
    return (
      <>
        <p>ATAK: {stats.atak + agStats.atak}</p>
        <p>OBRONA: {stats.obrona + agStats.obrona}</p>
        <p>MAGIA: {stats.magia + agStats.magia}</p>
      </>
    );
  }

  return (
    <div className="player-stats">
      <img src={playerImage} className="user-image"></img>
      <div className="player-info">{showStats(stats, agStats)}</div>
    </div>
  );
}
