import { UserLogin } from "@/Types/Types";
import { Auth } from "./Auth";

describe("check auth fn", () => {
  test("wrong user name and password", async () => {
    const userData: UserLogin = { userName: "morteza", password: "123456" };
    const res = await Auth(userData);

    expect(res.isSuccess).toBeFalsy();
    expect(res.firstName).toBeUndefined();
    expect(res.lastName).toBeUndefined();
    expect(res.messageRoot).toBe("نام کاربر یا رمز عبور اشتباه است");
  });
});
