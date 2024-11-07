import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrophy, FaUsers, FaCalendar, FaCoins } from 'react-icons/fa';
import Card from './ui/Card';
import Button from './ui/Button';

const Torneos = () => {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const tournaments = [
    {
      id: 1,
      name: 'FIFA FC 24 Championship',
      game: 'FIFA FC 24',
      image: 'https://media.gq.com.mx/photos/66fd872173f54ba5830a877a/16:9/w_2560%2Cc_limit/EA_Sports_FC_25_cover.jpg',
      participants: 64,
      maxParticipants: 128,
      startDate: '2024-02-01',
      prizePool: 5000,
      entryFee: 50
    },
    {
      id: 2,
      name: 'Dragon Ball Tournament',
      game: 'Dragon Ball Sparking Zero',
      image: 'https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/4KBDKEMQLRHCBBVHYEMFL5PPBU.jpg',
      participants: 32,
      maxParticipants: 64,
      startDate: '2024-02-15',
      prizePool: 2500,
      entryFee: 25
    },
    {
      id: 3,
      name: 'Warzone Battle Royale',
      game: 'Warzone',
      image: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg',
      participants: 16,
      maxParticipants: 32,
      startDate: '2024-02-28',
      prizePool: 1000,
      entryFee: 15
    },
    {
      id: 4,
      name: 'Street Fighter 6 World Championship',
      game: 'Street Fighter 6',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1364780/header.jpg',
      participants: 48,
      maxParticipants: 64,
      startDate: '2024-03-05',
      prizePool: 7500,
      entryFee: 75
    },
    {
      id: 5,
      name: 'Mortal Kombat 1 Tournament',
      game: 'Mortal Kombat 1',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg',
      participants: 24,
      maxParticipants: 32,
      startDate: '2024-03-10',
      prizePool: 3000,
      entryFee: 30
    },
    {
      id: 6,
      name: 'NBA 2K24 Pro League',
      game: 'NBA 2K24',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/header.jpg',
      participants: 16,
      maxParticipants: 32,
      startDate: '2024-03-15',
      prizePool: 2000,
      entryFee: 20
    },
    {
      id: 7,
      name: 'Tekken 8 Masters',
      game: 'Tekken 8',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg',
      participants: 32,
      maxParticipants: 64,
      startDate: '2024-03-20',
      prizePool: 4000,
      entryFee: 40
    },
    {
      id: 8,
      name: 'Rocket League Championship',
      game: 'Rocket League',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg',
      participants: 48,
      maxParticipants: 64,
      startDate: '2024-03-25',
      prizePool: 3500,
      entryFee: 35
    }
  ];

  const handleRegistration = (tournament) => {
    setSelectedTournament(tournament);
    setRegistering(true);
    
    setTimeout(() => {
      setRegistering(false);
      navigate('/tournament-success', { 
        state: { tournament }
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-gradient">Tournaments</h1>
        <Link to="/">
          <Button variant="secondary">Back to Home</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="game-card group animate-fadeIn">
            <Card className="overflow-hidden">
              <img
                src={tournament.image}
                alt={tournament.game}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaTrophy className="text-yellow-500 h-6 w-6 mr-2 group-hover:animate-bounce" />
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient">{tournament.name}</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <TournamentInfo
                    icon={<FaUsers />}
                    text={`${tournament.participants}/${tournament.maxParticipants} Players`}
                  />
                  <TournamentInfo
                    icon={<FaCalendar />}
                    text={new Date(tournament.startDate).toLocaleDateString()}
                  />
                  <TournamentInfo
                    icon={<FaCoins />}
                    text={`Prize Pool: $${tournament.prizePool.toLocaleString()}`}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 group-hover:text-gradient">
                    Entry Fee: ${tournament.entryFee}
                  </span>
                  <Button
                    onClick={() => handleRegistration(tournament)}
                    disabled={tournament.participants >= tournament.maxParticipants || registering}
                    variant={tournament.participants >= tournament.maxParticipants ? 'secondary' : 'primary'}
                    className="relative"
                  >
                    {registering && selectedTournament?.id === tournament.id ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Registering...</span>
                      </div>
                    ) : tournament.participants >= tournament.maxParticipants ? (
                      'Full'
                    ) : (
                      'Join Tournament'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const TournamentInfo = ({ icon, text }) => (
  <div className="flex items-center text-gray-300 group-hover:text-game-accent transition-colors duration-300">
    <div className="h-5 w-5 mr-2">
      {icon}
    </div>
    <span>{text}</span>
  </div>
);

export default Torneos;