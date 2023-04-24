import tagMaker from "../../models/tag/tagMaker";

tagMaker("h1", container, {
  className: "header",
  innerText: "계정 생성",
});

tagMaker("div", container, {
  className: "account_information",
});

const form = tagMaker("form", container, {
  action: "checkCreateAccount",
  method: "post",
});

tagMaker("input", form, {
  type: "text",
  name: "id",
  id: "id",
  placeholder: "아이디",
  required: "true",
});
