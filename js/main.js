import { UiRender } from "./UI/UIrender.js";
import { storyRequest } from "./Network/requests.js";
import { chatStory } from "./Network/netData.js";

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
   UiRender();
}
