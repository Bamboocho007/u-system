import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  greetingMessage = "dfvev";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();
    console.log(1);

    invoke<string>("sys_info").then((text) => {
      this.greetingMessage = text;
    });
  }
}
