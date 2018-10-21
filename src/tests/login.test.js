import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {Login} from "./../components";
import { HttpClientMock } from "./../utils/httpClient.mock";
import ApiClient from "./../utils/apiClient";
import { arranger } from "./../utils/mockDb";
import { AppWrapper } from "./appWrapper";

configure({ adapter: new Adapter() });

beforeAll(() => {
  ApiClient.setHttpClient(new HttpClientMock());
});

beforeEach(() => {
  arranger.clearAll();
});

it("should login the user", async () => {
  let wrapper = new AppWrapper();
  let loginView = wrapper.view().find(Login);

  arranger
    .entity("users")
    .add({ id: 1, username: "grigdevelop", password: "password" });
  arranger.entity("goals").add({ id: 1, title: "gugush", desc: "vaytem" });

  loginView.setState({ username: "grigdevelop", password: "password" });

  wrapper.logView();
  await loginView.instance().handleSubmit(AppWrapper.emptyEvent());
  wrapper.logView();
});
