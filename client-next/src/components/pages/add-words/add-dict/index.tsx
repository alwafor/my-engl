
import React, {useState} from 'react'

interface Props {}

export default function AddDict({}: Props) {
  const { loading, data, error } = useQuery(GET_ALL_WORDS_ID_NOTRANS);
  const [serverAddDict] = useMutation(ADD_DICT);
  const [opened4, setOpened4] = useState(false);
  const [dictName, setDictName] = useState("");
  const [dictDiff, setDictDiff] = useState(1);
  const [notificationText, setNotificationText] = useState("");
  const [choosedWordsIds, setChoosedWordsIds] = useState([]);
  const [isWordSelectorOpened, setIsWordSelectorOpened] = useState(false);

  if (loading) return <div>Loading</div>;

  if (error) {
    console.log("ERROR!");
    return <></>;
  }

  const addDictionary = () => {
    if (!dictName) {
      setNotificationText("У словаря должно быть имя!");
      return;
    }

    if (!choosedWordsIds.length) {
      setNotificationText("В словаре должно быть хотя бы одно слово!");
      return;
    }

    serverAddDict({
      variables: {
        wordsIds: choosedWordsIds,
        name: dictName,
        difficulty: +dictDiff,
      },
    });
    setChoosedWordsIds([]);
    setNotificationText("Словарь был успешно добавлен!");
  };

  const allWords = data.getAllWords;
  // console.log(typeof dictDiff);
  return (
    <>
      <section className={opened4 ? "block hide" : "block"}>
        <button className="btn_enter" onClick={() => setOpened4(!opened4)}>
          Добавление словаря
        </button>
        <div className="dict_input_wrapper">
          <div className="item">
            <div className="item_title">Название словаря</div>
            <input
              type="text"
              value={dictName}
              onChange={(e: any) => {
                setDictName(e.target.value);
              }}
            />
          </div>
          <div className="item">
            <button
              className="btn_words_selector"
              onClick={() => {
                if (!isWordSelectorOpened) {
                  setIsWordSelectorOpened(true);
                }
              }}
            >
              Добавить слова в словарь
            </button>
          </div>
          <div className="item">
            <div className="item_title">Дополнительные параметры</div>
            <div className="parameters">
              <div className="parameter">
                <div className="name">Сложность: </div>
                <select
                  value={dictDiff}
                  onChange={(e: any) => setDictDiff(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option value={n} key={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <input type="text" /> */}
          </div>
        </div>

        {notificationText ? (
          <div className="notification">{notificationText}</div>
        ) : (
          ""
        )}

        <button className="btn_add_words" onClick={addDictionary}>
          Добавить словарь
        </button>
      </section>
      {isWordSelectorOpened ? (
        <WordsSelector
          allWords={allWords}
          setChoosedWordsIds={setChoosedWordsIds}
          setIsWordSelectorOpened={setIsWordSelectorOpened}
          choosedWordsIds={choosedWordsIds}
        />
      ) : (
        ""
      )}
    </>
  );
}
