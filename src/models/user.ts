export default class AppUser {
    constructor(
        id: number = 0,
        name: string = 'Guest',
        email: string = 'guest@example.com',
        role: number = 0,
        password: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }
    id: number;
    name: string;
    email: string;
    role: number;
    password: string = '';
}
