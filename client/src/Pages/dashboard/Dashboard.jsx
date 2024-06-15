import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import '../../App.scss';
import Header from '../../components/layouts/header/Header';
import Invoices from '../../components/invoices/invoices/Invoices';
import Footer from '../../components/layouts/Footer';

const Dashboard = () => {

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/success`, { withCredentials: true });

      // console.log("response", response)
    } catch (error) {
      navigate("*")
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <main id='main-app'>
      <Header />
      <Invoices />
      <Footer />
    </main>
  )
}

export default Dashboard;