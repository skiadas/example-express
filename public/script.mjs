let popularityCutoff = 100;
if (document.readyState !== "loading") {
    myInitCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      myInitCode();
    });
  }

  function myInitCode() {
    document.body.addEventListener('click', handleLinkClicks);
    document.querySelector("#popularityCutoff")
    .addEventListener("change", (ev) => {
      popularityCutoff = Number((ev.target).value);
      const url = new URL(window.location);
      url.searchParams.set("popularity", popularityCutoff);
      // window.location = url;
      window.history.pushState({ popularity: popularityCutoff }, "", url);
      updateStuff();
    });
    const url = new URL(window.location);
    if (url.searchParams.has("popularity")) {
      document.querySelector("#popularityCutoff").value = url.searchParams.get("popularity");
      popularityCutoff = Number(url.searchParams.get("popularity"));
    }
    updateStuff();
  }

  function updateStuff() {
    // Need to reveal/hide elements not passing cutoff
    let moviesCount = 0;
    let totalPopularity = 0;
    document.querySelectorAll(".movie").forEach((el) => {
        const elPopularity = Number(el.dataset.popularity);
        if (elPopularity >= popularityCutoff) {
          el.classList.remove("hidden");
          moviesCount += 1;
          totalPopularity += elPopularity;
      }
        else {
            el.classList.add("hidden");
        }
    });

    document.querySelector("#movieCount").textContent = `${moviesCount}`;
    document.querySelector("#avgPopularity").textContent = `${totalPopularity / moviesCount}`;
  }
  
function handleLinkClicks(ev) {
  if (ev.target.matches("a")) {
    window.location = ev.target.href + `?popularity=${popularityCutoff}`;
    ev.preventDefault();
    return;
      console.log(ev.target.href);
    fetch(ev.target.href + `?fragment&popularity=${popularityCutoff}`)
      .then(r => r.text())
      .then(txt => {
        document.body.classList.add("loading");
        setTimeout(() => {
          document.querySelector("#genreDetails").innerHTML = txt;
          document.body.classList.remove("loading");
          updateStuff();  // NOTE: Fails, because handler at wrong element
        }, 1000);
      });
    ev.preventDefault();
  }
}