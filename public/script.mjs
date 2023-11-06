let popularityCutoff = 100;
if (document.readyState !== "loading") {
    myInitCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      myInitCode();
    });
  }

  function myInitCode() {
    document.querySelector("#popularityCutoff")
    .addEventListener("change", (ev) => {
      popularityCutoff = Number((ev.target).value);
      updateStuff();
    });
    updateStuff();
  }

  function updateStuff() {
    // Need to reveal/hide elements not passing cutoff
    let moviesCount = 0;
    let totalPopularity = 0;
    document.querySelectorAll(".movie").forEach((el) => {
        const elPopularity = Number(el.dataset.popularity);
        if (elPopularity >= popularityCutoff) el.classList.remove("hidden");
        else {
            el.classList.add("hidden");
            moviesCount += 1;
            totalPopularity += elPopularity;
        }
    });

    document.querySelector("#movieCount").textContent = `${moviesCount}`;
    document.querySelector("#avgPopularity").textContent = `${totalPopularity / moviesCount}`;
  }
  