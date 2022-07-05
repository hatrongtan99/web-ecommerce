import {useState, useEffect} from 'react'
import type {ChangeEvent} from 'react'
import {BsSearch} from 'react-icons/bs';
import classNames from 'classnames/bind';

import styles from '../../header/header.module.scss';
import productionApi from '~/api/productions';
import debounceInput from '~/hook/debouneInput';
import type {ResultSearch} from '~/interface/Search';

const cx = classNames.bind(styles);

const SearchInput = () => {

  const [textSearch, setTextSearch] = useState<string>('');
  const [isLoad, setIsLoad] = useState(false);
  const [resultSearch, setResultSearch] = useState<ResultSearch[]>([]);

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value)
  }

  const debounceValue = debounceInput(textSearch, 500);

  const fetchResultSeach = async () => {
    if(!debounceValue.trim()) return

    try {
      setIsLoad(true);
      const res = await productionApi.getProductBySearch(debounceValue)
      setResultSearch(res.data.result)
      setIsLoad(false);
      console.log()
    } catch (error) {
      setIsLoad(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchResultSeach()
  }, [debounceValue])
    
  return (
    <div className={`col-3 ${cx('header__search')}`}>
          <form className={cx('form__search')} onSubmit={fetchResultSeach}>
            
              <input 
                  value={textSearch}
                  onChange={handleInputSearch}
                  placeholder='Tìm kiếm'
              />
            {/* </Tippy> */}
            <button onClick={fetchResultSeach}>
              <BsSearch size='18'/>
            </button>
          </form>
    </div>
  )
}

export default SearchInput