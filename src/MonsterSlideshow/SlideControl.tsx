/**
 * @Author Alexander Bassov Sat Mar 16 2024
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent } from "react";

interface ControlsProps {
  direction: "backwards" | "forwards";
  onClicked: (evt: React.MouseEvent) => void;
}

const SlideControl: FunctionComponent<
  ControlsProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <button
      type="button"
      className="slide-control text-center"
      onClick={props.onClicked}
    >
      <p className="slide-control-icons">
        {props.direction == "backwards" ? "\u21AB" : "\u21AC"}
      </p>
    </button>
  );
};

export default SlideControl;
