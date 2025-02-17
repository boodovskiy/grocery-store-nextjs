import GlobalApi from "./_utils/GlobalApi";
import Slider from "./_components/Slider";
import CategoryList from "./_components/CategoryList";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
 
  return (
    <div className="p-5 md:p-10 px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList}/>
    </div>
  );
}
