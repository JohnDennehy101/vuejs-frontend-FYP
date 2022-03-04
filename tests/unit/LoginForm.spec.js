import { mount, flushPromises } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm.vue";
import UserService from "@/services/UserService";
import axios from "axios";

jest.mock("@/services/UserService");
jest.mock("axios");

describe("LoginForm.vue", () => {
  UserService.loginUser = jest.fn().mockResolvedValue({ test: "yes" });

  afterEach(() => {
    // reset mock after each test
    UserService.mockClear();
  });
  it("sets value of email and password when user inputs values", async () => {
    const wrapper = mount(LoginForm);

    await wrapper.find("input[type=text]").setValue("name@mail.com");
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    expect(wrapper.find("input[type=text]").element.value).toEqual(
      "name@mail.com"
    );
    expect(wrapper.find("input[type=password]").element.value).toEqual(
      "ReallyHardPassword112234%"
    );
  });

  it("We can check if the consumer called the class constructor", () => {
    const userService = new UserService();
    expect(UserService).toHaveBeenCalledTimes(1);
  });

  it("successfully logs in a user if valid password and email", async () => {
    const wrapper = mount(LoginForm);

    await wrapper.find("input[type=text]").setValue("name@mail.com");
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);
    const spySubmitForm = jest.spyOn(wrapper.vm, "submitForm");
    await wrapper.find("form").trigger("submit.prevent");

    await flushPromises();

    expect(spySubmitForm).toBeCalled();
  });
});
