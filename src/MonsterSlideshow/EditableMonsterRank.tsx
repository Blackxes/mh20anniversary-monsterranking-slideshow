/**
 * @Author Alexander Bassov Sun Mar 17 2024
 * @Email blackxes.dev@gmail.com
 */

import { FunctionComponent, useState } from "react";

interface EditableMonsterRankProps {
  currentRank: number;
  onChanged: (newRank: number) => void;
  min: number;
  max: number;
}

const EditableMonsterRank: FunctionComponent<EditableMonsterRankProps> = (
  props
) => {
  const [viewMode, setViewMode] = useState<"editing" | "present">("present");
  const [customRank, setCustomRank] = useState(props.currentRank);

  const startEditing = () => setViewMode("editing");
  const endEditing = () =>
    !void setViewMode("present") &&
    customRank &&
    customRank != props.currentRank &&
    props.onChanged(customRank);

  const onInput = (evt: React.ChangeEvent<HTMLInputElement>) =>
    !void setCustomRank(+evt.target.value);
  const onBlur = () => endEditing();
  const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) =>
    evt.key == "Enter" && endEditing();

  return (
    <div className="monster-rank">
      {viewMode == "present" ? (
        <div className="monster-rank-text-wrapper flex place-center">
          <p className="monster-rank-edit-icon">&#9998;</p>
          <p className="monster-rank-text" onClick={startEditing}>
            {props.currentRank}
          </p>
        </div>
      ) : viewMode == "editing" ? (
        <input
          className="monster-rank-input"
          type="number"
          autoFocus
          onInput={onInput}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={props.min + " - " + props.max}
        />
      ) : (
        <p className="error">Invalid view mode</p>
      )}
    </div>
  );
};

export default EditableMonsterRank;
