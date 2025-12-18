/**
 * 목차(index.html)에서 데모를 "라우팅"하기 위한 아주 작은 라우터.
 * - 링크 클릭을 가로채서 iframe에 로드
 * - URL은 /?demo=/html/.../ 형태로 pushState (뒤/앞 이동 지원)
 *
 * NOTE: 이 파일은 브라우저에서 ESM으로 로드되는 것을 전제로 함.
 */
function _setSearchParam(url, key, value) {
    const next = new URL(url.toString());
    const params = next.searchParams;
    if (value == null || value === "") params.delete(key);
    else params.set(key, value);
    next.search = params.toString();
    return next;
}

function _isPlainLeftClick(e) {
    return (
        e.button === 0 &&
        !e.defaultPrevented &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
    );
}

/**
 * @param {object} opts
 * @param {string} opts.iframeId
 * @param {string} opts.viewerId
 * @param {string} opts.closeId
 * @param {string} opts.openId
 * @param {string} opts.pathId
 */
navigate.initDemoRouter = function initDemoRouter(opts) {
    const iframe = document.getElementById(opts.iframeId);
    const viewer = document.getElementById(opts.viewerId);
    const closeBtn = document.getElementById(opts.closeId);
    const openLink = document.getElementById(opts.openId);
    const pathEl = document.getElementById(opts.pathId);

    if (!iframe || !viewer) return;

    const applyDemo = (demoPath) => {
        if (!demoPath) {
            viewer.style.display = "none";
            iframe.removeAttribute("src");
            if (openLink) openLink.setAttribute("href", "#");
            if (pathEl) pathEl.textContent = "";
            return;
        }

        viewer.style.display = "block";
        iframe.setAttribute("src", demoPath);
        if (openLink) openLink.setAttribute("href", demoPath);
        if (pathEl) pathEl.textContent = demoPath;
    };

    const readFromLocation = () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("demo");
    };

    const pushDemo = (demoPath) => {
        const nextUrl = _setSearchParam(window.location.href, "demo", demoPath);
        // index.html에서만 동작하게 현재 pathname 유지
        history.pushState({ demo: demoPath }, "", nextUrl.pathname + nextUrl.search);
        applyDemo(demoPath);
    };

    const clearDemo = () => {
        const nextUrl = _setSearchParam(window.location.href, "demo", "");
        history.pushState({ demo: null }, "", nextUrl.pathname + nextUrl.search);
        applyDemo(null);
    };

    // 초기 로드
    applyDemo(readFromLocation());

    // 뒤로/앞으로
    window.addEventListener("popstate", () => {
        applyDemo(readFromLocation());
    });

    // 닫기 버튼
    if (closeBtn) closeBtn.addEventListener("click", clearDemo);

    // 링크 클릭 가로채기: /html/ 아래 예제만 iframe 라우팅 처리
    document.addEventListener("click", (e) => {
        if (!_isPlainLeftClick(e)) return;

        const a = e.target?.closest?.("a[href]");
        if (!a) return;
        if (a.target && a.target !== "_self") return;

        const href = a.getAttribute("href");
        if (!href) return;
        if (!href.startsWith("/html/")) return;

        e.preventDefault();
        pushDemo(href);
    });
};

export default navigate;
