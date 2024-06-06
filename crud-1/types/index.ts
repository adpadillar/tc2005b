function execute<T extends (...params: Parameters<T>) => Promise<any>>(
  f: T,
  ...args: Parameters<T>
): Promise<ReturnType<T> | Error> {
  return f(...args).catch((e) => new Error(e));
}

function unwrap<T>(v: T | Error): typeof v extends Error ? never : T {
  if (v instanceof Error) throw v;
  // @ts-ignore
  return v;
}

function match<T, U, V>(
  v: T | Error,
  successFn: (v: T) => U,
  errorFn: (e: Error) => V
): U | V {
  if (v instanceof Error) return errorFn(v);
  return successFn(v);
}

declare function getUserById(id: number): Promise<{ name: string }>;

// const user = await getUserById(1);
const userRes = await execute(getUserById, 1);

const res = match(
  userRes,
  (user) => user.name,
  () => "No name"
);

class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}
class Post {}
class Message {}

const keyClassPairs = {
  user: User,
  post: Post,
  message: Message,
};

declare function getPostById(
  id: number
): Promise<{ title: string; type: "post" }>;
declare function _getUserById(
  id: number
): Promise<{ name: string; type: "user" }>;
declare function getMessage(): Promise<{ message: string; type: "message" }>;

declare function deserialize<
  const T extends { type: keyof typeof keyClassPairs }
>(o: T): InstanceType<(typeof keyClassPairs)[T["type"]]>;

const _user = await execute(_getUserById, 1);
const _post = await execute(getPostById, 1);
const _message = await execute(getMessage);

const user = unwrap(_user);
const post = unwrap(_post);
const message = unwrap(_message);

const userObj = deserialize(user);
const postObj = deserialize(post);
const messageObj = deserialize(message);
