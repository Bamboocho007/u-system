import { JSX } from "solid-js";
import { A } from "@solidjs/router";

export default function Header(): JSX.Element {
  return (
    <div class="header">
      <nav class="container row">
        <A href="/" end activeClass="active">
          Common
        </A>
        <A href="/cpu" activeClass="active">
          Cpu
        </A>
        <A href="/temperatures" activeClass="active">
          Temperatures
        </A>
        <A href="/disks" activeClass="active">
          Disks
        </A>
      </nav>
    </div>
  );
}
