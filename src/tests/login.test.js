import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Login, Goals, Goal } from "./../components";
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
  arranger.entity("goals").add({ id: 2, title: "vardan", desc: "chidem" });

  loginView.setState({ username: "grigdevelop", password: "password" });  
  //loginView.find('input').first().simulate('change', {target: {value: 'grigdevelop'}});
  wrapper.view().update();
  //wrapper.logView(); 


  await loginView.instance().handleSubmit(AppWrapper.emptyEvent());


  let goals = wrapper.view().update().find(Goals).find(Goal);
  //wrapper.logView();
  expect(goals).not.toBeNull();
  expect(goals.length).toBe(2);

  expect(goals.first().instance().state.goal).not.toBeNull(); 
  expect(goals.first().instance().state.goal.title).toBe('gugush'); 
   
});
