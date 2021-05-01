import { useMutation } from "@apollo/client";
import { useState } from "react";
import { TOGGLE_DICT } from "../../common/Graphql/mutation";
import { IDictionary } from "../../common/Types/types";

interface DictionaryProps {
   dictionary: IDictionary
}

const Dictionary: React.FC<DictionaryProps> = ({dictionary: {id, name, choosed,difficulty,wordsCount}}) => {
   const [serverToggleDict] = useMutation(TOGGLE_DICT);
   const [selected,setSelected] = useState(choosed);

   const selectDictionary = () => {
      serverToggleDict({variables: {id,state: !selected}});
      setSelected(!selected);
   }

   return (
      <div className={"dict " + (selected ? "selected" : "")} onClick={selectDictionary}> 
         <div className="dict_left">
            <div className="dict_title">{name}</div>
            <div className="dict_desc">
               Словарь, который подойдёт начинающим.
            </div>
         </div>
         <div className="dict_right">
            <div className="dict_difficulty">
               Сложность: <span>{difficulty}/10</span>
            </div>
            <div className="dict_type">Тип: Словарный</div>
            <div className="dict_words_count">
               Количество слов: {wordsCount}
            </div>
            <div className="dict_selected">Выбран: {selected ? "✓" : "X"}</div>
         </div>
      </div>
   );
};

export default Dictionary;
