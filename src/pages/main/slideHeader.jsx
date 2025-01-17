import { Swiper, SwiperSlide }  from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SoloLeveling from '../../assets/BannerFundo.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style/slideHearder.css'

const backgroundImageStyle = (id) => {
    const imagem = [
        `url('${SoloLeveling}')`,
        "url('')",
        "url('')",
        "url('')"
    ]
    return {backgroundImage: imagem[id-1], backgroundSize: 'cover', backgroundPosition: 'center'}
};

const NameObra = (id) => {
    const name = [ "Solo leveling", "", "", ""];
    return name[id-1];
};

const logoStyle = (id) => {
    const imagem = [
        "https://imgs.search.brave.com/60WsWSXvcR9tFuz60x4b3FclxdiycfKUo8byZSe8npM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3Lm90/YWt1cHQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIwLzA3/L1NvbG8tTGV2ZWxp/bmctdGVtLWEtY2Fw/YS1kby0yJUMyJUIw/LXZvbHVtZS1yZXZl/bGFkby1wZWxhLWVk/aXRvcmEtTmV3UE9Q/LmpwZz9yZXNpemU9/Njk2LDEwMDAmc3Ns/PTE",
    ];
    return imagem[id-1];
};

const Card = ({id}) => {
    return(
        <>
            <div className='Card-Header' id={id} style={backgroundImageStyle(id)}>
                <div className="infor">
                    <div className="infor-Obra">
                        <h2>Capitulos:</h2>
                        <h2>{NameObra(id)}</h2>
                    </div>
                    <button type="button"><a href="#">Comece a ler</a><ArrowForwardIcon color="black" fontSize="small"/></button>
                </div>
                <img className='Logo-Obra' src={logoStyle(id)} alt="Logo" />
            </div>
        </>
    );
};

export default function SlideHeader(){
    const componetsGruop = Array.from({length: 4 }, (_, index) => (
        <SwiperSlide key={index}><Card key={index} id={index + 1}/></SwiperSlide>
    ));
    return(
        <>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
            
            >
                {componetsGruop}
            </Swiper>
        </>
    );
}