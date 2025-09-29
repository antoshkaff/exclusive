export const isSafari = (): boolean => {
    const ua = navigator.userAgent;
    const isIOS = /iP(hone|od|ad)/.test(ua);
    const isSafariDesktop =
        /^((?!chrome|android).)*safari/i.test(ua) &&
        !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);

    return isIOS || isSafariDesktop;
};
