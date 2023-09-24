import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { setIdSelect, showSubjectSchedule } from 'store/reducers/subjectScheduleSlice';
import { AppBar, Button, Slide, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { CloseCircle, Printer } from 'iconsax-react';
import AnimateButton from 'components/@extended/AnimateButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubjectScheduleDetailDialog = () => {
  const theme = useTheme();
  const idSelect = useSelector((state) => state.subject_schedule.idSelect);
  const open = !!idSelect;

  const handleClose = () => {
    dispatch(setIdSelect(0));
  };

  useEffect(() => {
    if (idSelect != 0) dispatch(showSubjectSchedule(idSelect));
  }, [idSelect]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
      <AppBar
        sx={{
          position: 'relative',
          boxShadow: theme.customShadows.z2,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          bgcolor: '#fff'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 66 }}>
          <Typography sx={{ flex: 1, color: '#000' }} variant="h4" component="div">
            Kế hoạch mở nhóm học phần học kì 1 năm học 2023
          </Typography>
          <Stack direction="row" spacing={2}>
            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
              <Button variant="dashed" color="success" startIcon={<Printer />}>
                Xuất Excel
              </Button>
            </AnimateButton>
            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
              <Button variant="dashed" color="error" onClick={handleClose} aria-label="close" startIcon={<CloseCircle />}>
                Đóng
              </Button>
            </AnimateButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pt: 2 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quis minus quae nobis maxime laudantium ut quo, ullam in delectus
        praesentium distinctio sed. Totam itaque vitae placeat, laboriosam quam doloribus cupiditate adipisci ullam rerum maxime,
        accusantium dolor eius, qui minus optio temporibus? Cum, dolor, est nam delectus atque dolore quis velit officiis blanditiis,
        distinctio quae. Aut, inventore iure iusto itaque consequuntur ab ea. Eos dolorem id distinctio ea blanditiis soluta repellat
        impedit, delectus esse optio magni similique ducimus, saepe omnis ut nam. A corporis quas vero distinctio veniam saepe enim vitae
        perspiciatis ab laudantium. Distinctio corrupti obcaecati suscipit sunt illo ullam laudantium quia facilis sapiente. Reprehenderit
        suscipit ea, hic dicta repudiandae harum, perspiciatis excepturi architecto autem sint rem non veniam molestias aut cum nam
        sapiente! Odit quasi consequuntur at quas provident quam ad minima voluptas, harum aliquam culpa itaque aspernatur natus accusantium
        quod ut eius, id nemo nesciunt libero iste dicta magnam. Voluptate voluptates perspiciatis vero! Sed minima consectetur et eum
        impedit hic vel rerum, unde ipsam quasi nobis rem facilis minus veritatis repudiandae eaque asperiores, iste earum enim incidunt,
        deleniti porro doloremque est! Quod esse unde dignissimos quae consectetur? Quia explicabo ipsa delectus repudiandae quidem unde,
        quae ducimus at labore, nobis veritatis, fugiat consectetur nisi debitis soluta! Inventore eligendi excepturi ipsam quas ipsa
        consequuntur facilis velit, esse blanditiis corporis quo maiores iste culpa modi. Ad quisquam, similique eius praesentium saepe
        aperiam aut facere ab blanditiis nobis accusantium voluptatum, dolorem aspernatur voluptatem sit minus! Iste soluta id ex?
        Reprehenderit inventore enim officia obcaecati non deleniti modi autem eligendi aliquam magni provident possimus laborum
        voluptatibus est, quae eos temporibus cupiditate et ipsum omnis quia dignissimos! Velit ea unde numquam quidem aspernatur amet nemo
        vero est eum saepe pariatur debitis, odio perspiciatis minus. Voluptates rerum consequatur earum atque blanditiis inventore placeat
        iste doloribus odio vel recusandae, veniam error porro nostrum soluta itaque commodi iure unde at minima? Velit cupiditate
        laudantium facilis architecto nisi eveniet quisquam labore quaerat aliquid! Quasi praesentium labore error commodi nostrum, ad rem
        inventore vero ea cumque exercitationem id accusamus harum quibusdam placeat eligendi excepturi enim, nulla quis nam aliquam. Sunt,
        dicta! Possimus corporis harum maxime dignissimos magnam ipsum error debitis veritatis odio obcaecati. Tenetur, saepe sunt sit aut
        iste sapiente veritatis omnis minima cumque voluptatibus perferendis quidem cum nemo, quaerat nobis aliquam. At, perferendis ipsa
        voluptate autem eaque sed illum similique! Animi reprehenderit, fugiat voluptatem veritatis explicabo non, unde eos nihil amet
        inventore voluptate tempora magnam. Id delectus, culpa maxime voluptates excepturi tempora debitis? Sunt, eveniet quam aperiam
        dignissimos culpa ipsa eligendi repellat. Reiciendis magni iusto unde aperiam laudantium itaque pariatur sequi non repellendus enim
        assumenda, animi voluptate fugit tenetur vero porro repudiandae expedita excepturi. Doloremque sed nemo perferendis tempore labore
        delectus facilis consectetur debitis consequatur sequi quas enim necessitatibus, deserunt, totam molestias, commodi natus porro.
        Iste fugit doloribus, non exercitationem ullam consequuntur corrupti modi dicta similique magni perferendis quis ex iure dignissimos
        aut quas, cumque veniam incidunt nemo facere aperiam nesciunt expedita possimus. Labore possimus fugit nemo, autem delectus minima
        iusto est et vero repellendus, earum illum perferendis aspernatur nisi. Quae voluptatibus illo quo adipisci asperiores suscipit sed
        omnis dolores. Non recusandae ratione ipsam sit voluptate delectus corporis, hic minus. Amet officiis molestias animi, ullam,
        ducimus autem quas recusandae molestiae similique ut corrupti eum quo dolore debitis perspiciatis magnam, numquam aperiam dicta!
        Magni tenetur, eos, quidem perspiciatis, ullam esse assumenda atque asperiores eum doloribus officiis cum at ad ducimus! Atque odit
        illum rem consectetur facilis molestiae perspiciatis hic veniam mollitia fugiat nostrum, quis corporis itaque eligendi ipsa velit
        expedita, iste earum, cum fugit? Omnis libero ducimus fugit asperiores laudantium ipsam tempore deserunt, fuga dolor ipsum ut harum
        magni, expedita recusandae mollitia, provident quo cumque pariatur vero laborum veritatis iusto. Consequatur iste vero obcaecati,
        libero magni saepe illo amet tenetur maxime, ab labore nisi error corrupti rem facilis, ratione nulla! Exercitationem tenetur
        deserunt adipisci laboriosam, cum earum ducimus rerum culpa ut hic a ab reiciendis maiores itaque porro fuga doloribus consequuntur
        distinctio recusandae illum nisi ad perferendis sit minus? Voluptas laboriosam similique repellendus. Perferendis pariatur quaerat
        ab modi, nobis odit, laborum iste dolorem eaque repellat aspernatur est, voluptate nulla porro? Harum aspernatur sed dolore velit
        saepe veniam ipsa beatae assumenda odit odio, eos, tempore earum eum a quas pariatur cum voluptate! Ipsum cumque officiis, beatae
        incidunt possimus molestias magni deserunt illum libero reiciendis ex ut accusamus, iusto quibusdam, sint natus fugit? Cumque
        laborum suscipit sapiente minus perferendis accusamus ut minima fuga recusandae enim magni, tempore, totam asperiores explicabo
        dolores natus aliquam officiis sint. Voluptate ad corrupti totam fuga mollitia quibusdam pariatur, alias praesentium odio, delectus
        enim eveniet, sunt consequuntur. Est, dolores eius! Accusamus dolorum doloribus exercitationem cumque ipsa quaerat dolorem, nostrum
        animi maxime accusantium, recusandae quas. Distinctio aspernatur eveniet nesciunt itaque at. Nulla repudiandae quod corrupti
        voluptate exercitationem iure ad eum sint iusto, suscipit at! Quia fugit culpa eligendi voluptatem, deleniti, quibusdam ratione
        maiores explicabo dolore et ad perferendis fugiat, delectus iure laudantium dolorem? Inventore sit tempore quas, incidunt dolor non,
        asperiores eum nemo labore corporis exercitationem velit, libero repellat minus possimus consequuntur voluptatum deserunt iste iusto
        hic mollitia doloribus explicabo nostrum alias. Saepe quas consequatur nesciunt, aliquid facilis maxime sed, quia incidunt optio cum
        assumenda magni labore numquam quasi tempora. Libero velit, repudiandae iusto deleniti illo quas possimus magni, error laboriosam
        earum voluptatibus impedit nobis amet omnis ut quos tempora quod eum incidunt optio necessitatibus totam quisquam? Accusamus,
        obcaecati architecto! Id maxime exercitationem ducimus cumque, illum temporibus dolore eveniet error optio facilis veritatis vero.
        Exercitationem quia distinctio officia qui nesciunt commodi doloribus. Esse provident quo modi quisquam voluptatum delectus repellat
        perferendis nihil deleniti vel voluptas saepe fuga quibusdam quam, ut recusandae commodi ipsum ducimus? Est accusamus assumenda quam
        repellat perspiciatis! Soluta esse itaque nam error quasi maxime. Accusantium, officia nobis aspernatur necessitatibus unde quidem.
        Possimus ipsum deleniti, vel accusamus illo quis accusantium molestias impedit voluptas sit aliquam tempore ea blanditiis! Quisquam
        rerum beatae dolor laborum fugit quos doloribus veritatis culpa, nisi animi vel? Doloremque voluptatem libero adipisci!
      </DialogContent>
    </Dialog>
  );
};

export default memo(SubjectScheduleDetailDialog);
