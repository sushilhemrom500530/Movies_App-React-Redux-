import { useParams } from "react-router-dom"
import { useFetchDetailsData } from "../../hooks/fetch-details-data";
import { useSelector } from "react-redux";
import moment from "moment";
import Devider from "../../components/devider";

export default function MoviesDetails() {
  const { id, explore } = useParams();
  const { imageURL } = useSelector(state => state?.moviesData);
  const { data: detailsData } = useFetchDetailsData(`/${explore}/${id}`)
  const { data: castData } = useFetchDetailsData(`/${explore}/${id}/credits`)
  const crewData = castData?.crew;
  // console.log("cast data :",castData?.crew[0]?.name)
  const writerValue = crewData?.filter((item) => item?.job === "Writer")?.map(ele => ele?.name)?.join(",")
  // console.log("writer value :",writerValue)


  const duration = Number(detailsData?.runtime / 60).toFixed(1)?.split(".")
  return (
    <div>
      {/* <h2 className="text-lg lg:text-xl my-3 font-semibold capitalize">
         Movies Details
        </h2> */}
      {/* banner section  */}
      <div className="w-full h-[320px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + detailsData?.backdrop_path}
            alt="details image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col gap-5 lg:flex-row lg:gap-10 mt-1">
        <div className="relative w-fit mx-auto lg:mx-0 lg:-mt-28 min-w-60">
          <img
            src={imageURL + detailsData?.poster_path}
            alt="details image"
            className="lg:w-60 w-80 h-80 object-cover rounded"
          />
        </div>
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold text-white">{detailsData?.title || detailsData?.name}</h1>
          <p className="text-neutral-400">{detailsData?.tagline}</p>
          <Devider />
          <div>
            <div className="flex gap-3">
              <p>Rating : {Number(detailsData?.vote_average).toFixed(1)}+</p>
              <span>|</span>
              <p>View : {Number(detailsData?.vote_count).toFixed(1)}</p>
              <span>|</span>
              <p>Duration : {duration[0]}h {duration[1]}m</p>
            </div>
            <Devider />
          </div>
          <div className="">
            <h1 className="text-lg font-medium  text-white">Overview</h1>
            <p className="text-neutral-400 my-1">{detailsData?.overview}</p>
            <Devider />
            <div className="flex items-center text-center gap-3">
              <h1>Status: {detailsData?.status}</h1>
              <span>|</span>
              <p>Release Data :  {moment(detailsData?.release_date).format("MMM Do YYYY")}</p>
              <span>|</span>
              <p>Revenue :  {Number(detailsData?.revenue)}</p>
            </div>
            <Devider />
          </div>
          {/* director  */}
          <div>
            {/* <p><span className="text-white">Director</span> : {crewData[0]?.name} </p> */}
            <Devider />
            <p><span className="text-white">Writter</span> : {writerValue} </p>
          </div>
          <Devider />
          <h1 className="text-lg font-bold text-white">Cast: </h1>
         <div className="grid grid-cols-[repeat(auto-fit,96px)]">
         {
          castData?.cast?.filter?.(ele=>ele?.profile_path)?.map((cast)=> {
            return (
              <div key={cast?.id}>
                  <div className="">
                    <img src={imageURL+cast?.profile_path} alt="profile image" className="w-24 h-24 object-cover rounded-full" />
                  </div>
                  <p className="text-sm font-medium text-center">{cast?.name}</p>
              </div>
            )
          })
         }
         </div>
        </div>
      </div>
    </div>
  )
}
