var development = {
    calendar: {
        authorize_url       : "https://www.googleapis.com/auth/calendar.readonly",
        events_url          : "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        callBackURL         : "http://localhost:5555/calendar/callback"
    },
    uber: {
        access_token_url    : "https://login.uber.com/oauth/token",
        authorize_url       : "https://login.uber.com/oauth/authorize",
        base_url            : "https://login.uber.com/",
        scopes              : ["profile", "history_lite", "request"],
        base_uber_url       : "https://api.uber.com/v1/",
        base_uber_url_v1_1  : "https://api.uber.com/v1.1/",
        profile_url         : "https://api.uber.com/v1/me",
        sandbox_base_url    : "https://sandbox-api.uber.com/v1/",
        redirect_url        : "http://localhost:5555/uber/callback"
    }
};

var production = {
    calendar: {
        authorize_url       : "https://www.googleapis.com/auth/calendar.readonly",
        events_url          : "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        callBackURL         : "https://andelahack.herokuapp.com/calendar/callback"
    },
    uber: {
        access_token_url    : "https://login.uber.com/oauth/token",
        authorize_url       : "https://login.uber.com/oauth/authorize",
        base_url            : "https://login.uber.com/",
        scopes              : ["profile", "history_lite", "request"],
        base_uber_url       : "https://api.uber.com/v1/",
        base_uber_url_v1_1  : "https://api.uber.com/v1.1/",
        profile_url         : "https://api.uber.com/v1/me",
        sandbox_base_url    : "https://sandbox-api.uber.com/v1/",
        redirect_url        : "https://andelahack.herokuapp.com/uber/callback"
    }
};

var staging = {
    calendar: {
        authorize_url       : "https://www.googleapis.com/auth/calendar.readonly",
        events_url          : "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        callBackURL         : "http://localhost:5555/calendar/callback"
    },
    uber: {
        access_token_url    : "https://login.uber.com/oauth/token",
        authorize_url       : "https://login.uber.com/oauth/authorize",
        base_url            : "https://login.uber.com/",
        scopes              : ["profile", "history_lite", "request"],
        base_uber_url       : "https://api.uber.com/v1/",
        base_uber_url_v1_1  : "https://api.uber.com/v1.1/",
        profile_url         : "https://api.uber.com/v1/me",
        sandbox_base_url    : "https://sandbox-api.uber.com/v1/",
        redirect_url        : "https://andelahack.herokuapp.com/uber/callback"
    }
};

var test = {
    calendar: {
        authorize_url       : "https://www.googleapis.com/auth/calendar.readonly",
        events_url          : "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        callBackURL         : "http://localhost:5555/calendar/callback"
    },
    uber: {
        access_token_url    : "https://login.uber.com/oauth/token",
        authorize_url       : "https://login.uber.com/oauth/authorize",
        base_url            : "https://login.uber.com/",
        scopes              : ["profile", "history_lite", "request"],
        base_uber_url       : "https://api.uber.com/v1/",
        base_uber_url_v1_1  : "https://api.uber.com/v1.1/",
        profile_url         : "https://api.uber.com/v1/me",
        sandbox_base_url    : "https://sandbox-api.uber.com/v1/",
        redirect_url        : "https://andelahack.herokuapp.com/uber/callback"
    }
};

module.exports = {
    development : development,
    test        : test,
    production  : production,
    staging     : staging
};
