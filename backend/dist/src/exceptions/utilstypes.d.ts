export interface RequestWithUser extends Request {
    user: {
        [key: string]: any;
    };
}
