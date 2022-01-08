function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

u("window").on("load", setVh);
u("window").on("resize", setVh);

let activePage = "timer";

function navigate(hash) {
    u(".nav-link").removeClass("activeLink");
    u(`.nav-link[setPage="${hash}"]`).addClass("activeLink");
    
    u(".page").removeClass("show");
    u(`#${hash}Page`).addClass("show");

    activePage = hash;
}

HashNav.initial(activePage);
HashNav.change(navigate);

(() => {
    u("[setPage]").each((node, i) => {
        u(node).on("click", (e) => {
            HashNav.change(u(node).attr("setPage"));
		    e.preventDefault();
        });
    });

    newScramble();
})();

function newScramble() {
    u(".scramble").text(scramble(3, 25));
}

u(".scramble").on("click", newScramble);