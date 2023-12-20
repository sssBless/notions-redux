export class Api {
  static #BASE_PORT = 5001;
  static #BASE_URL = `http://localhost:${this.#BASE_PORT}/`;

  static async #getPromise(address) {
    const res = await fetch(`${address}`);
    if (!res.ok) {
      throw new Response('', {
        status: res.status,
        statusText: 'Page note found',
      });
    }

    return res.json();
  }

  static fetchUser = async ({ email, password }) => {
    const params = new URLSearchParams({ email, password });
    return await fetch(this.#BASE_URL + `users?${params}`)
      .then((r) => r.json())
      .then((users) => users[0]);
  };

  static checkUser = async (email) => {
    const params = new URLSearchParams({ email });
    if (
      await this.#getPromise(this.#BASE_URL + `users?${params}`).then(
        (users) => users[0]
      )
    ) {
      return true;
    }
    return false;
  };

  static addUser = (user) => {
    fetch(this.#BASE_URL + 'users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: '',
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        password: user.password,
        registrationDate: user.registrationDate,
      }),
    });
  };

  static fecthNotes = async (userId) => {
    const params = new URLSearchParams({ userId });
    return await this.#getPromise(this.#BASE_URL + `notes?${params}`);
  };

  static addNote = ({ id, userId, title, body }) => {
    fetch(this.#BASE_URL + 'notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: id,
        userId: userId,
        title: title,
        body: body,
        createAt: Date.now(),
      }),
    });
  };

  static deleteNote = (id) => {
    fetch(this.#BASE_URL + `notes/${id}`, {
      method: 'DELETE',
    });
  };

  static getNote = async (id, userId) => {
    const params = new URLSearchParams({ id, userId });
    return await this.#getPromise(this.#BASE_URL + `notes?${params}`);
  };
  static updateNote = ({ id, title, body }) => {
    fetch(this.#BASE_URL + `notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  };
}

//   static getUser = async (user) => {
//     return await this.#getPromise(
//       this.#rootURL + `users?${await getUserQuery(user.email, user.password)}`
//     ).then((users) => users[0]);
//   };
