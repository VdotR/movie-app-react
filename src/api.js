const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGFjODk0NmYyMGJhZDllYWE0ZWU5OGFhZDkxYTBlNSIsIm5iZiI6MS42OTU3OTQyNTk0OTQwMDAyZSs5LCJzdWIiOiI2NTEzYzQ1MzA0OTlmMjAwYWJiY2RiNjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.H6A37rbiZdLd7Sp8LoXJaS-ZTQoth68wdCIwaQPq87A"

const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`, 
        'content-type': 'application/json',
};

export const fetchMovies = async ({ category, page }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
    { headers }
  );
  return res.json();
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    { headers }
  );
  return res.json();
};


export const login = async ({ username, password }) => {
    try {
        // Step 1: Get request token
        const options1 = {method: 'GET', headers};
        const res1 = await fetch('https://api.themoviedb.org/3/authentication/token/new', options1)
        if (!res1.ok) throw new Error('Step 1: Failed to fetch request token');
        const res1JSON = await res1.json();
        //console.log(res1JSON);
        const requestToken = res1JSON.request_token;
        //console.log(requestToken);

        //Step 2: Login with username and password and Validate request token
        const options2 = {
            method: 'POST',
            headers,
            body: JSON.stringify({
                username,
                password,
                request_token: requestToken
            })
        };

        const res2 = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', options2)
        //console.log(res2);
        if (!res2.ok) throw new Error('Step 2: Failed to validate request token');
        //const validateTokenContent = await res2.json();
        //console.log(validateTokenContent);
        // Step 3: Create session ID
        const options3 = {
            method: 'POST',
            headers,
            body: JSON.stringify({request_token: requestToken})
        };

        const res3 = await fetch('https://api.themoviedb.org/3/authentication/session/new', options3)
        if (!res3.ok) throw new Error('Step 3: Failed to create session ID');
        const sessionContent = await res3.json();
        //console.log(sessionContent);
        const sessionId = sessionContent.session_id;
        //console.log("Session id: " + sessionId);
        
        // Step 4: get account ID
        const options4 = {
            method: 'GET',
            headers
        };

        const res4 = await fetch(`https://api.themoviedb.org/3/account?api_key=}&session_id=${sessionId}`, options4)
        if (!res4.ok) throw new Error('Step 4: Failed to get account ID');
        const accountContent = await res4.json();
        const accountId = accountContent.id;
        
        // Step 5: Store everything in local storage
        const userData = {
            username,
            accountId,
            sessionId,
            requestToken
        }

        localStorage.setItem('userData', JSON.stringify(userData));

        return userData;
    } catch (e) {
        throw e;
    }
};

export const getLikedMovies = async ({sessionId, accountId}) => {
    const options = {
        method: 'GET',
        headers: headers
    };

    const res = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=2`, options)
    const resJSON = await res.json();
    return resJSON;
};

export const getRatedMovies = async ({sessionId, accountId}) => {
    const options = {
        method: 'GET',
        headers: headers
    };

    const res = await fetch(`https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=en-US&session_id=${sessionId}&sort_by=created_at.asc`, options)
    const resJSON = await res.json();
    return resJSON;
};

export const setMovieFavoriteStatus = async ({movieId, sessionId, accountId, favorite}) => {
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({media_type: 'movie', media_id: movieId, favorite})
    };

    fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

export const likeMovie = async ({movieId, sessionId, accountId}) => {
    await setMovieFavoriteStatus({
        movieId,
        sessionId,
        accountId,
        favorite: true
    });
};

export const unlikeMovie = async ({movieId, sessionId, accountId}) => {
    await setMovieFavoriteStatus({
        movieId,
        sessionId,
        accountId,
        favorite: false
    });
};

export const rateMovie = async ({movieId, sessionId, value}) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${TMDB_API_KEY}`
        },
        body: `{"value":${value}}`
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

// const userData = await login({
//     username: 'victorren2002_backup',
//     password: 'Vren2002'
// })

// console.log(userData);

// await likeMovie({
//     movieId: 974576,
//     sessionId: userData.sessionId,
//     accountId: userData.accountId
// });

// await unlikeMovie({
//     movieId: 974576,
//     sessionId: userData.sessionId,
//     accountId: userData.accountId
// });

// await getRatedMovies({
//     sessionId: userData.sessionId,
//     accountId: userData.accountId
// });

// await getLikedMovies({
//     sessionId: userData.sessionId,
//     accountId: userData.accountId
// });

// await rateMovie({
//     movieId: 1144430,
//     sessionId: userData.sessionId,
//     value: 5
// });