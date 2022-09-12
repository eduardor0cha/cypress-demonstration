class User {
  id: number;
  name: string;
  username: string;
  age: number;

  toJSON(): JSON {
    const json: JSON = {} as JSON;
    json["id"] = this.id;
    json["name"] = this.name;
    json["username"] = this.name;
    json["age"] = this.age;
    return json;
  }

  static fromJSON(json: JSON): User {
    const user = new User();
    user.id = Number(json["id"]);
    user.name = String(json["name"]);
    user.username = String(json["username"]);
    user.age = Number(json["age"]);
    return user;
  }
}

export default User;
