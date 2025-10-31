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
      <h2>🏆 Top 5 Players</h2>
      <table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
        <tr><th>Rank</th><th>Name</th><th>Score</th><th>Date</th></tr>`;

    topPlayers.forEach((player, i) => {
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${player.name}</td>
          <td>${player.score}</td>
          <td>${player.date}</td>
        </tr>`;
    });

    html += `</table>`;
    this.container.innerHTML = html;
  }
}
