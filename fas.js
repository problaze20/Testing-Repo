window.fas = {
  version: "1.0.0",

  _logStyle: "color: white; background: #007acc; padding: 2px 6px; border-radius: 3px; font-weight: bold;",
  _warnStyle: "color: #d97706; font-weight: bold;",
  _errorStyle: "color: #dc2626; font-weight: bold;",

  // Welcome message
  _welcome() {
    console.log("%cWelcome to fas! To get started, type %cfas.help()%c to see all available commands.",
      this._logStyle, "color:#ffcc00; font-weight:bold;", this._logStyle);
  },

  location(x) {
    if (x === "href") {
      console.log("%cLocation href:", this._logStyle, document.location.href);
    } else if (x === "path") {
      console.log("%cLocation path:", this._logStyle, document.location.pathname);
    } else if (x === "hostname") {
      console.log("%cLocation hostname:", this._logStyle, document.location.hostname);
    } else {
      console.log(`%cUnknown location command: %c${x}`, this._warnStyle, "");
    }
  },

  reload() {
    console.log("%cReloading page...", this._logStyle);
    location.reload();
  },

  searchGoogle(x) {
    if (!x || typeof x !== "string" || !x.trim()) {
      console.warn("%cPlease provide a valid search query string.", this._warnStyle);
      return;
    }
    let y = encodeURIComponent(x.trim());
    console.log(`%cSearching Google for: "${x.trim()}"`, this._logStyle);
    location.href = "https://www.google.com/search?q=" + y;
  },

  clearConsole() {
    console.clear();
    console.log("%cConsole cleared.", this._logStyle);
  },

  copy(text) {
    if (!navigator.clipboard) {
      console.warn("%cClipboard API not supported in this browser.", this._warnStyle);
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => console.log(`%cCopied to clipboard: "${text}"`, this._logStyle))
      .catch(err => {
        console.warn("%cClipboard API failed, trying fallback...", this._warnStyle, err);
        this.copyFallback(text);
      });
  },

  copyFallback(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        console.log(`%cCopied to clipboard (fallback): "${text}"`, this._logStyle);
      } else {
        console.warn('%cFallback: Copy command unsuccessful', this._warnStyle);
      }
    } catch (err) {
      console.error('%cFallback: Copy failed', this._errorStyle, err);
    }

    document.body.removeChild(textarea);
  },

  async outdated() {
    const versionUrl = "https://raw.githubusercontent.com/problaze20/Testing-Repo/main/fasver.json";
    try {
      const response = await fetch(versionUrl);
      if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);

      const data = await response.json();
      if (!data.version) {
        console.warn("%cVersion info not found in fetched JSON.", this._warnStyle);
        return;
      }

      if (data.version === this.version) {
        console.log(`%cfas v${this.version} is up to date.`, this._logStyle);
      } else {
        console.warn(`%cfas v${this.version} is outdated. Latest version is v${data.version}`, this._warnStyle);
      }
    } catch (error) {
      console.error("%cFailed to fetch version info:", this._errorStyle, error);
    }
  },

  showCookies() {
    const cookies = document.cookie;
    if (!cookies) {
      console.log("%cNo cookies found.", this._logStyle);
      return;
    }
    const cookieList = cookies.split("; ").map(cookie => {
      const [name, ...rest] = cookie.split("=");
      const value = rest.join("=");
      return { name, value };
    });
    console.log("%cCookies:", this._logStyle);
    console.table(cookieList);
  },

  clearStorage(type) {
    if (type === "localStorage") {
      localStorage.clear();
      console.log("%clocalStorage cleared.", this._logStyle);
    } else if (type === "sessionStorage") {
      sessionStorage.clear();
      console.log("%csessionStorage cleared.", this._logStyle);
    } else {
      console.warn("%cInvalid storage type. Use 'localStorage' or 'sessionStorage'.", this._warnStyle);
    }
  },

  openNewTab(url) {
    if (!url || typeof url !== "string" || !url.trim()) {
      console.warn("%cPlease provide a valid URL string.", this._warnStyle);
      return;
    }
    const newWindow = window.open(url.trim(), "_blank");
    if (newWindow) {
      console.log(`%cOpened new tab with URL: ${url.trim()}`, this._logStyle);
      newWindow.focus();
    } else {
      console.warn("%cFailed to open new tab. Pop-up might be blocked.", this._warnStyle);
    }
  },

  help() {
    console.log("%cfas commands:", this._logStyle);
    console.log("%cfas.location(x)       %c- Show location info: 'href', 'path', 'hostname'", "font-weight:bold", "");
    console.log("%cfas.reload()          %c- Reload the current page", "font-weight:bold", "");
    console.log("%cfas.searchGoogle(q)   %c- Search Google with query q", "font-weight:bold", "");
    console.log("%cfas.clearConsole()    %c- Clear the browser console", "font-weight:bold", "");
    console.log("%cfas.copy(text)        %c- Copy given text to clipboard", "font-weight:bold", "");
    console.log("%cfas.outdated()        %c- Check if your fas version is up to date", "font-weight:bold", "");
    console.log("%cfas.showCookies()     %c- Show all cookies in a table", "font-weight:bold", "");
    console.log("%cfas.clearStorage(t)   %c- Clear 'localStorage' or 'sessionStorage' (t = storage type)", "font-weight:bold", "");
    console.log("%cfas.openNewTab(url)   %c- Open a new tab with the given URL", "font-weight:bold", "");
    console.log("%cfas.help()            %c- Show this help message", "font-weight:bold", "");
  }
};

// Show welcome message on load
window.fas._welcome();
