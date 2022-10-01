import { View } from "./view.js";
export class MensagemView extends View {
    template(model) {
        var valores = model.split(",");
        return `<p class="alert ${valores[0]}">${valores[1]}</p>`;
    }
}
