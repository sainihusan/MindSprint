export class Leaderboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  getScores() {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    return scores.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  render() {
    const topPlayers = this.getScores();

    if (topPlayers.length === 0) {
      this.container.innerHTML = "<p>No scores yet. Play a quiz first!</p>";
      return;
    }

    let html = `
      <h2>Top 5 Players</h2>
      <div class="table-wrapper">
        <table class="responsive-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>`;

    topPlayers.forEach((player, i) => {
      html += `
        <tr>
          <td data-label="Rank">${i + 1}</td>
          <td data-label="Name">${player.name}</td>
          <td data-label="Score">${player.score}</td>
          <td data-label="Date">${player.date}</td>
        </tr>`;
    });

    html += `
          </tbody>
        </table>
      </div>`;

    this.container.innerHTML = html;
  }
}

const leaderboard = new Leaderboard("leaderboard-container");
leaderboard.render();
