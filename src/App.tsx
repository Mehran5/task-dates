import { useEffect, useState } from 'react';
import { Companies } from './components/Companies';
import CompanyService from './services/company.service';

function App() {

  const [companies, setCompanies] = useState<any>([]);
  useEffect(() => {
    retrieveCompanies();
  }, []);

  const retrieveCompanies = () => {
    CompanyService.getAll()
      .then((response: any) => {
        setCompanies(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <Companies companies={companies} />
  );
}

export default App;
